// @flow
import { type Change, type Node } from 'slate';
import inlineValidation from './inlineValidation';
import type Options from './options';

function createValidateNode(opts: Options) {
    return (node: Node): void | (Change => *) => {
        if (node.object === 'inline') return inlineValidation(node);
        if (node.object !== 'block') return undefined;
        if (!node.isLeafBlock()) return undefined;
        if (opts.softBreakIn.indexOf(node.type) !== -1) return undefined;
        if (node.text.indexOf('\n') === -1) return undefined;
        return change => {
            node
                .getTexts()
                .reverse()
                .forEach(t => {
                    let lastIndex = t.text.lastIndexOf('\n');
                    while (lastIndex !== -1) {
                        change.removeTextByKey(t.key, lastIndex, 1, {
                            normalize: false
                        });
                        change.splitDescendantsByKey(
                            node.key,
                            t.key,
                            lastIndex,
                            { normalize: false }
                        );
                        lastIndex =
                            lastIndex !== 0
                                ? t.text.lastIndexOf('\n', lastIndex - 1)
                                : -1;
                    }
                });
        };
    };
}

export default createValidateNode;
