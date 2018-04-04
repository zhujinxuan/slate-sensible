// @flow
import React, { Component } from 'react';
import { type Value, type Change, type Range } from 'slate';
import {
    type InterfaceUpdater,
    type GetMentions,
    type MentionItemChildType
} from '../type';
import MentionMenuAtRange from './MentionMenuAtRange';

type State<T> = {
    name: null | string,
    text: string,
    mentions: Array<T>,
    range: null | Range
};

type Props<T> = {
    updater: InterfaceUpdater,
    value: Value,
    submitChange: Change => *,
    getMentions: GetMentions<T>,
    MentionItemChild: MentionItemChildType<T>
};

class MentionMenuContainer<T: { name: string }> extends Component<
    Props<T>,
    State<T>
> {
    constructor(props: Props<T>) {
        super(props);
        const { updater } = props;

        updater.next = () => this.offsetMention(1);
        updater.previous = () => this.offsetMention(-1);
        updater.changeHOF = this.changeHOF;
        updater.isActive = this.isActive;

        this.state = {
            name: null,
            mentions: [],
            range: null,
            text: ''
        };
    }

    componentWillReceiveProps(nextProps: Props<T>) {
        const { value, getMentions } = nextProps;
        const { mentions, range, text } = getMentions(value);
        this.setState({ mentions, range, text });
    }

    compomnentDidMount() {
        const { value, getMentions } = this.props;
        const { mentions, range, text } = getMentions(value);
        if (mentions.length > 0) {
            this.setState({ mentions, range, text });
        }
    }

    changeHOF = (): void | (Change => *) => {
        if (!this.isActive()) {
            return undefined;
        }
        const { name, mentions, range } = this.state;
        const mention = mentions.find(m => m.name === name);
        if (!mention) {
            return undefined;
        }
        if (!name || !range) {
            return undefined;
        }
        const { anchorOffset, focusOffset } = range;
        // TODO: use insertTextAtRange and move delta
        return change =>
            change
                .moveOffsetsTo(anchorOffset, focusOffset)
                .insertText(mention.name);
    };

    selectMention: T => void = (mention: T) => {
        const { mentions } = this.state;
        const index = mentions.indexOf(mention);
        if (index > -1) {
            this.setState({ name: mention.name });
        }
    };

    offsetMention = (offset: number) => {
        if (offset === 0) {
            return;
        }
        const { name, mentions } = this.state;
        if (mentions.length === 0) {
            return;
        }
        const lastIndex = mentions.findIndex(m => m.name === name);
        let index;
        if (offset > 0) {
            index = (lastIndex + offset) % mentions.length;
        } else {
            index =
                ((lastIndex === -1 ? 0 : lastIndex) +
                    offset +
                    mentions.length) %
                mentions.length;
        }

        if (index > -1 && mentions[index]) {
            this.setState({ name: mentions[index].name });
        }
    };

    isActive = (): boolean => {
        const { mentions } = this.state;
        return mentions && mentions.length > 0;
    };

    render() {
        const { mentions, name, text } = this.state;
        const { selectMention, changeHOF } = this;
        const { submitChange, value, MentionItemChild } = this.props;
        return (
            <MentionMenuAtRange
                {...{
                    mentions,
                    name,
                    text,
                    value,
                    submitChange,
                    selectMention,
                    changeHOF,
                    MentionItemChild
                }}
            />
        );
    }
}

export default MentionMenuContainer;
