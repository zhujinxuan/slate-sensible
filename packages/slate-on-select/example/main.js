// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* global window */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import INITIAL_VALUE from './value';
import Editor from './Editor';

class Example extends Component<*, *> {
    render() {
        return <Editor value={INITIAL_VALUE} />;
    }
}

ReactDOM.render(<Example />, window.document.getElementById('example'));
