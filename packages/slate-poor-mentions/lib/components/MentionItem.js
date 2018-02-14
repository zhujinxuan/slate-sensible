// @flow
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';

type Props = {
    mention: { name: string, text: string },
    selected: boolean,
    confirmMention: () => *,
    selectMention: ({ name: string, text: string }) => *
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
        const { mention, selected } = this.props;
        const { onMouseDown, onMouseEnter } = this;
        const className = selected ? 'selected' : '';
        return (
            <li
                className={className}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
            >
                {mention.name}
            </li>
        );
    }
}

export default MentionItem;
