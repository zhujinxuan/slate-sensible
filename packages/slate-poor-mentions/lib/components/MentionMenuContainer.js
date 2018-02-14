// @flow
import React, { Component } from 'react';
import { type Value, type Change, type Range } from 'slate';
import { InterfaceUpdater, type GetMentions, type Mention } from '../type';
import MentionMenuAtRange from './MentionMenuAtRange';

type State = {
    name: null | string,
    mentions: Array<Mention>,
    range: null | Range
};

type Props = {
    updater: InterfaceUpdater,
    value: Value,
    submitChange: Change => *,
    getMentions: GetMentions
};

class MentionMenuContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { updater } = props;

        updater.next = () => this.offsetMention(1);
        updater.previous = () => this.offsetMention(-1);
        updater.changeHOF = this.changeHOF;
        updater.isActive = this.isActive;

        this.state = {
            name: null,
            mentions: [],
            range: null
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        const { value, getMentions } = nextProps;
        const { mentions, range } = getMentions(value);
        this.setState({ mentions, range });
    }

    compomnentDidMount() {
        const { value, getMentions } = this.props;
        const { mentions, range } = getMentions(value);
        if (mentions.length > 0) {
            this.setState({ mentions, range });
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
        return change =>
            change
                .moveOffsetsTo(anchorOffset, focusOffset)
                .insertText(mention.name);
    };

    selectMention = (mention: Mention) => {
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

        if (index > -1) {
            this.setState({ name: mentions[index].name });
        }
    };

    isActive = (): boolean => {
        const { mentions } = this.state;
        return mentions && mentions.length > 0;
    };

    render() {
        const { mentions, name } = this.state;
        const { selectMention, changeHOF } = this;
        const { submitChange, value } = this.props;
        return (
            <MentionMenuAtRange
                {...{
                    mentions,
                    name,
                    value,
                    selectMention,
                    submitChange,
                    changeHOF
                }}
            />
        );
    }
}

export default MentionMenuContainer;
