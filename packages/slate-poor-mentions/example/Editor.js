// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component, type Node as ReactNode } from 'react';
import { type Value, type Node } from 'slate';
import { Editor } from 'slate-react';
import createMentionPlugin from '../src/index';

type NodeProps = {
    node: Node,
    attributes: Object,
    children: ReactNode
};
function renderNode(props: NodeProps): ReactNode {
    const { node, attributes, children } = props;
    switch (node.type) {
        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        default:
            return null;
    }
}

type Props = {
    mentions: Array<{ name: string }>,
    beforeMatchRegex: RegExp,
    afterMatchRegex: RegExp,
    value: Value
};

class SlateEditor extends Component<Props, { value: Value }> {
    plugins: Array<*>;
    constructor(props: Props) {
        super(props);
        const { value } = props;
        const mentionPlugin = createMentionPlugin(props);
        this.plugins = [mentionPlugin];
        this.state = { value };
    }

    onChange = ({ value }: { value: Value }) => {
        this.setState({
            value
        });
    };

    render() {
        const { value } = this.state;
        const { plugins } = this;
        return (
            <div>
                <Editor
                    placeholder={'Enter some text...'}
                    renderNode={renderNode}
                    plugins={plugins}
                    value={value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default SlateEditor;
