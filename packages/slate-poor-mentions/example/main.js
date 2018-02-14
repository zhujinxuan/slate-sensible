// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* global window */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import INITIAL_VALUE from './value';
import Editor from './Editor';

const beforeMatchRegex = /{ *\$[^{}\n]*$/;
const afterMatchRegex = /^[^{}\n]*}/;
const beforeFormatMatcherRegex = /^ *{ */;
const afterFormatMatcherRegex = / *} *$/;
const mentions = [
    '{$ User-id }',
    '{$ User-cat }',
    '{$ User-Address }',
    '{$ User First Name }',
    '{$ User Last Name}'
].map(x => ({ name: x }));
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
            />
        );
    }
}

ReactDOM.render(<Example />, window.document.getElementById('example'));
