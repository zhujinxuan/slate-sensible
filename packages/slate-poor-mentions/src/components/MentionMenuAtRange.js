// @flow
import React, { Component } from 'react';
import { Value, type Change } from 'slate';
import { type Mention, type MentionItemChildType } from '../type';
import MentionMenu from './MentionMenu';

// Adjust "fake scroll" to ensure the selected item is shown
// props:
// {mentions, name, selectMention, submitChange, changeHOF }

const numShowedMentions = 9;
function showedMentions<T>(
    mentions: Array<Mention<T>>,
    name: null | string,
    num: number,
    offsetIndex: number
): Array<Mention<T>> {
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
    mentions: Array<Mention<T>>,
    name: null | string,
    value: Value,
    submitChange: Change => *,
    changeHOF: () => void | (Change => *),
    selectMention: (Mention<T>) => *,
    MentionItemChild: MentionItemChildType<T>
};
type State<T> = {
    mentions: Array<Mention<T>>
};
class MentionMenuAtRange<T: { name: string }> extends Component<
    Props<T>,
    State<T>
> {
    constructor(props: Props<T>) {
        super();
        const { mentions, name } = props;
        this.state = {
            mentions: showedMentions(mentions, name, numShowedMentions, 0)
        };
    }
    componentWillReceiveProps(nextProps: Props<T>) {
        const { name, mentions } = nextProps;
        const offsetIndex = this.state.mentions.findIndex(m => m.name === name);
        this.setState({
            mentions: showedMentions(
                mentions,
                name,
                numShowedMentions,
                offsetIndex
            )
        });
    }
    render() {
        const { mentions } = this.state;
        const {
            value,
            name,
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
                    selectMention,
                    submitChange,
                    changeHOF,
                    MentionItemChild
                }}
            />
        );
    }
}

export default MentionMenuAtRange;
