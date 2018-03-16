// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* global window */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import INITIAL_VALUE from './value';
import Editor from './Editor';
import mentions from './constant-mentions';
import './main.css';

const beforeMatchRegex = /{ *\$[^{}\n]*$/;
const afterMatchRegex = /^[^{}\n]*}/;
const beforeFormatMatcherRegex = /^ *{ */;
const afterFormatMatcherRegex = / *} *$/;
const matchInBetweenRegex = /{\$[^{}$]+}/g;
class Example extends Component<*, *> {
    render() {
        return (
            <Editor
                value={INITIAL_VALUE}
                mentions={mentions}
                beforeFormatMatcherRegex={beforeFormatMatcherRegex}
                afterFormatMatcherRegex={afterFormatMatcherRegex}
                beforeMatchRegex={beforeMatchRegex}
                afterMatchRegex={afterMatchRegex}
                matchInBetweenRegex={matchInBetweenRegex}
            />
        );
    }
}

/**
 * Mount the router.
 */

const root = window.document.createElement('div');
root.id = 'example';
window.document.body.appendChild(root);

const render = () => {
    ReactDOM.render(<Example />, root);
};

render();
