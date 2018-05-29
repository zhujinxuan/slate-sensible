/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
const SourceMap = require('source-map');
const fs = require('fs');
const path = require('path');
const async = require('async');
const loaderUtils = require('loader-utils');

// Matches only the last occurrence of sourceMappingURL
let baseRegex =
        '\\s*[@#]\\s*sourceMappingURL\\s*=\\s*([^\\s]*)(?![Ss]*sourceMappingURL)',
    // Matches /* ... */ comments
    regex1 = new RegExp(`/\\*${baseRegex}\\s*\\*/`),
    // Matches // .... comments
    regex2 = new RegExp(`//${baseRegex}($|\n|\r\n?)`),
    // Matches DataUrls
    regexDataUrl = /data:[^;\n]+(?:;charset=[^;\n]+)?;base64,(.*)/;

module.exports = function(input, inputMap) {
    this.cacheable && this.cacheable();
    const resolve = this.resolve;
    const addDependency = this.addDependency;
    const emitWarning = this.emitWarning || function() {};
    const params = loaderUtils.getOptions(this) || {};
    const match = input.match(regex1) || input.match(regex2);
    if (match) {
        const url = match[1];
        const dataUrlMatch = regexDataUrl.exec(url);
        var callback = this.async();
        if (dataUrlMatch) {
            processMap(
                JSON.parse(new Buffer(dataUrlMatch[1], 'base64').toString()),
                this.context,
                callback
            );
        } else {
            resolve(
                this.context,
                loaderUtils.urlToRequest(url),
                (err, result) => {
                    if (err) {
                        emitWarning(`Cannot find SourceMap '${url}': ${err}`);
                        return untouched();
                    }
                    addDependency(result);
                    fs.readFile(result, 'utf-8', (err, content) => {
                        if (err) {
                            emitWarning(
                                `Cannot open SourceMap '${result}': ${err}`
                            );
                            return untouched();
                        }
                        processMap(
                            JSON.parse(content),
                            path.dirname(result),
                            callback
                        );
                    });
                }
            );
        }
    } else {
        var callback = this.callback;
        return untouched();
    }
    function untouched() {
        callback(null, input, inputMap);
    }
    function processMap(map, context, callback) {
        if (
            !map.sourcesContent ||
            map.sourcesContent.length < map.sources.length
        ) {
            const sourcePrefix = map.sourceRoot ? `${map.sourceRoot}/` : '';
            map.sources = map.sources.map(s => sourcePrefix + s);
            delete map.sourceRoot;
            const missingSources = map.sourcesContent
                ? map.sources.slice(map.sourcesContent.length)
                : map.sources;
            async.map(
                missingSources,
                (source, callback) => {
                    resolve(
                        context,
                        loaderUtils.urlToRequest(source),
                        (err, result) => {
                            if (err) {
                                emitWarning(
                                    `Cannot find source file '${source}': ${err}`
                                );
                                return callback(null, null);
                            }
                            addDependency(result);
                            fs.readFile(result, 'utf-8', (err, content) => {
                                if (err) {
                                    emitWarning(
                                        `Cannot open source file '${result}': ${err}`
                                    );
                                    return callback(null, null);
                                }
                                callback(null, {
                                    source: result,
                                    content
                                });
                            });
                        }
                    );
                },
                (err, info) => {
                    map.sourcesContent = map.sourcesContent || [];
                    info.forEach(res => {
                        if (res) {
                            map.sources[map.sourcesContent.length] = res.source;
                            map.sourcesContent.push(res.content);
                        } else {
                            map.sourcesContent.push(null);
                        }
                    });
                    processMap(map, context, callback);
                }
            );
            return;
        }

        if (params.includeModulePaths) {
            // Ensure module paths include full path from current working directory
            const pwd = process.cwd();
            if (context.substring(0, pwd.length) === pwd) {
                context = context.substr(pwd.length + 1);
            }
            map.sources = map.sources.map(source => {
                if (source.substring(0, pwd.length) === pwd) {
                    return source.substr(pwd.length + 1);
                }
                return path.join(context, source);
            });
        }

        callback(null, input.replace(match[0], ''), map);
    }
};
