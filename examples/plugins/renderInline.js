// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React, { type Node } from 'react';
import { type Inline } from 'slate';

type Props = {
    node: Inline,
    children: Node,
    attributes: Object
};

function renderNode(props: Props) {
    const { node, attributes, children } = props;
    if (node.object !== 'inline') return null;
    switch (node.type) {
        case 'link':
            return (
                <a href={node.data.type} {...attributes}>
                    {children}
                </a>
            );
        default:
            return undefined;
    }
}

export default { renderNode };
