// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React, { type Node } from 'react';
import { type Mark } from 'slate';

type Props = {
    children: Node,
    mark: Mark,
    attributes: Object
};

function renderMark(props: Props) {
    const { children, mark, attributes } = props;
    switch (mark.type) {
        case 'bold':
            return <strong {...{ attributes }}>{children}</strong>;
        case 'italic':
            return <em {...{ attributes }}>{children}</em>;
        case 'code':
            return <code {...{ attributes }}>{children}</code>;
        case 'underline':
            return <u {...{ attributes }}>{children}</u>;
        case 'strikethrough':
            return <strike {...{ attributes }}>{children}</strike>;
        default:
            return null;
    }
}

export default { renderMark };
