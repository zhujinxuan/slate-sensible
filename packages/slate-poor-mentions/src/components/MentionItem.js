// @flow
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { type MentionItemChildType } from '../type';

const { Component } = React;

type Props<T: { name: string }> = {
    mention: T,
    text: string,
    selected: boolean,
    confirmMention: () => *,
    selectMention: T => *,
    MentionItemChild: MentionItemChildType<T>
};

class MentionItem<T: { name: string }> extends Component<Props<T>> {
    onMouseDown = (event: SyntheticMouseEvent<>) => {
        event.preventDefault();
        this.props.confirmMention();
    };
    onMouseEnter = (event: SyntheticMouseEvent<>) => {
        event.preventDefault();
        const { selectMention, mention } = this.props;
        selectMention(mention);
    };

    render() {
        const { mention, selected, MentionItemChild, text } = this.props;
        const children = <MentionItemChild {...{ mention, text }} />;
        const { onMouseDown, onMouseEnter } = this;
        const className = selected ? 'selected' : '';
        return (
            <li
                className={className}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
            >
                {children}
            </li>
        );
    }
}

export default MentionItem;
