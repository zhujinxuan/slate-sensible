// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { type Value, type Change } from 'slate';
import { Editor } from 'slate-react';

import initialValue from './value';
import plugins from './plugins';

type State = {
    value: Value
};

class App extends Component<{}, State> {
    state: State = { value: initialValue };
    onChange = (change: Change) => {
        const { value } = change;
        this.setState({ value });
    };
    render() {
        const { onChange } = this;
        const { value } = this.state;
        return (
            <div className="example">
                <Editor value={value} plugins={plugins} onChange={onChange} />
            </div>
        );
    }
}
export default App;
