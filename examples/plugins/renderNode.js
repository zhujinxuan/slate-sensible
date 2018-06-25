// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React, { type Node } from 'react';
import { type Block } from 'slate';

type Props = {
    node: Block,
    children: Node,
    attributes: Object
};

function renderNode(props: Props) {
    const { node, attributes, children } = props;
    if (node.object !== 'block') return null;

    switch (node.type) {
        case 'heading':
            return React.createElement(
                `h${node.data.level}`,
                attributes,
                children
            );
        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'quote':
            return <blockquote {...attributes}>{children}</blockquote>;
        default:
            return undefined;
    }
}

export default { renderNode };
