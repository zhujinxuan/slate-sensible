// @flow
import React, { type Node as ReactNode } from 'react';
import { type Mark } from 'slate';

interface InterfaceProps {
    mark: Mark;
    children: ReactNode | void;
}

function createRenderMark(
    decorationMarks: Array<Mark>,
    classNamesForDecoration: Array<string>
) {
    return (props: InterfaceProps): ReactNode | void => {
        const { mark }: { mark: Mark } = props;
        const index = decorationMarks.findIndex(m => m.type === mark.type);
        const className = classNamesForDecoration[index];
        if (!className) return undefined;
        return <span className={className}>{props.children}</span>;
    };
}
export default createRenderMark;
