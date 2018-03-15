// @flow
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component, type ComponentType } from 'react';
import { type Mention } from '../type';

type Props = {
    mention: { name: string, text: string },
    selected: boolean,
    confirmMention: () => *,
    selectMention: Mention => *,
    MentionItemChild: ?ComponentType<Mention>
};

class MentionItem extends Component<Props> {
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
        const children = MentionItemChild ? (
            <MentionItemChild {...mention} />
        ) : (
            mention.name
        );
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
