// @flow
import React, { type Node as ReactNode } from 'react';

type Props = {
    isOpened: boolean,
    onOpen: (?HTMLElement) => void,
    children: ReactNode
};

function Portal(props: Props) {
    const { isOpened, onOpen, children, ...otherProps } = props;
    const style = {
        position: 'absolute',
        display: isOpened ? 'block' : 'none'
    };

    return (
        <div ref={onOpen} style={style} {...otherProps}>
            {children}
        </div>
    );
}

export default Portal;
