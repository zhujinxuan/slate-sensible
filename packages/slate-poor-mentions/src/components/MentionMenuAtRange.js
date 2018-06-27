// @flow
import React from 'react';
import { Value, type Change } from 'slate';
import { polyfill } from 'react-lifecycles-compat';
import { type MentionItemChildType } from '../type';
import MentionMenu from './MentionMenu';

const { Component } = React;

const numShowedMentions = 9;

function showedMentions<T: { name: string }>(
    mentions: Array<T>,
    name: null | string,
    num: number,
    offsetIndex: number
): Array<T> {
    const index = mentions.findIndex(m => m.name === name);
    if (index === -1 || !name) {
        return mentions.slice(0, num);
    }

    if (mentions.length < num) {
        num = mentions.length;
    }
    if (offsetIndex < 0) {
        offsetIndex = 0;
    } else if (offsetIndex > num - 1) {
        offsetIndex = num - 1;
    }
    const startIndex =
        (index - offsetIndex + mentions.length) % mentions.length;
    const endIndex = startIndex + num;
    if (endIndex < mentions.length) {
        return mentions.slice(startIndex, endIndex);
    }
    const beforeMentions = mentions.slice(startIndex, mentions.length);
    const afterMentions = mentions.slice(0, endIndex - mentions.length);
    return [...beforeMentions, ...afterMentions];
}

type Props<T> = {
    mentions: Array<T>,
    name: null | string,
    value: Value,
    text: string,
    submitChange: Change => *,
    changeHOF: () => void | (Change => *),
    selectMention: T => *,
    MentionItemChild: MentionItemChildType<T>
};

type State<T> = {
    mentions: Array<T>,
    props: Props<T>
};

class MentionMenuAtRange<T: { name: string }> extends Component<
    Props<T>,
    State<T>
> {
    constructor(props: Props<T>) {
        super();
        const { mentions, name } = props;

        this.state = {
            mentions: showedMentions(mentions, name, numShowedMentions, 0),
            // eslint-disable-next-line react/no-unused-state
            props
        };
    }

    static getDerivedStateFromProps(props: Props<T>, state: State<T>) {
        if (props === state.props) return null;

        const { name, mentions } = props;
        const offsetIndex = state.mentions.findIndex(m => m.name === name);
        return {
            mentions: (showedMentions(
                mentions,
                name,
                numShowedMentions,
                offsetIndex
            ): Array<T>),
            props
        };
    }

    render() {
        const { mentions } = this.state;
        const {
            value,
            name,
            text,
            selectMention,
            submitChange,
            changeHOF,
            MentionItemChild
        } = this.props;
        return (
            <MentionMenu
                {...{
                    value,
                    mentions,
                    name,
                    text,
                    selectMention,
                    submitChange,
                    changeHOF,
                    MentionItemChild
                }}
            />
        );
    }
}

polyfill(MentionMenuAtRange);

export default MentionMenuAtRange;
