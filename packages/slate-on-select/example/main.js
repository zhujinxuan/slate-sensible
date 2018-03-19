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

