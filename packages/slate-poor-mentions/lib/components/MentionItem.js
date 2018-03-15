// @flow
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { type Mention, type MentionItemChildType } from '../type';

type Props<T> = {
    mention: Mention<T>,
    selected: boolean,
    confirmMention: () => *,
    selectMention: (Mention<T>) => *,
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
        const { mention, selected, MentionItemChild } = this.props;
        const children = <MentionItemChild {...mention} />;
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
