// @flow
import React, { type Node as ReactNode } from 'react';
import { type Mark } from 'slate';

interface InterfaceProps {
    mark: Mark;
    children: ReactNode | void;
}

function createRenderMark(
    decorationMark: Mark,
    classNameForDecoration: string
) {
    return (props: InterfaceProps): ReactNode | void => {
        const { mark }: { mark: Mark } = props;
        if (mark !== decorationMark) {
            return undefined;
        }
        return <span className={classNameForDecoration}>{props.children}</span>;
    };
}
export default createRenderMark;
