// @flow
/* global window */
import React from 'react';
import { findDOMRange } from 'slate-react';
import { type Value, type Change } from 'slate';
import Portal from './Portal';
import MentionItem from './MentionItem';
import { type MentionItemChildType } from '../type';
import applyBestPosition from '../utils/apply-best-position';

const { Component } = React;

function hideWithRect(dom: HTMLElement) {
    dom.style.position = 'absolute';
    dom.style.visibility = 'hidden';
    dom.style.display = 'block';
}

type Props<T> = {
    text: string,
    value: Value,
    mentions: Array<T>,
    name: null | string,
    selectMention: T => *,
    changeHOF: () => void | (Change => *),
    submitChange: Change => *,
    MentionItemChild: MentionItemChildType<T>
};

type State = {
    classNames: Array<string>
};

class MentionMenu<T: { name: string }> extends Component<Props<T>, State> {
    menu: ?HTMLElement;

    state = {
        classNames: ['left', 'top']
    };

    componentDidMount() {
        this.adjustPosition();
    }

    componentDidUpdate(prevProps: Props<T>) {
        if (prevProps === this.props) return;
        this.adjustPosition();
    }

    adjustPosition = () => {
        const { menu } = this;
        if (!menu) return;
        hideWithRect(menu);
        const { mentions, value } = this.props;
        if (mentions.length === 0) return;
        const domRange = findDOMRange(value.selection, window);
        if (!domRange) return;

        applyBestPosition(domRange, menu);
        menu.style.visibility = 'visible';

        const { left, top } = menu.getBoundingClientRect();

        const {
            left: leftS,
            top: topS,
            bottom: bottomS
        } = domRange.getBoundingClientRect();

        const midS = (topS + bottomS) / 2;

        const classNames = [
            left < leftS ? 'right' : 'left',
            top < midS ? 'bottom' : 'top'
        ];

        if (classNames.find((p, index) => this.state.classNames[index] !== p)) {
            this.setState({ classNames });
        }
    };

    confirmMention = () => {
        const { changeHOF, submitChange } = this.props;
        const toChange = changeHOF();

        if (!toChange) {
            return;
        }

        submitChange(toChange);
    };

    getClassName = () => {
        const positionPrefix = 'RichEditor-mention-position';
        let result = `RichEditor-mention-menu`;

        this.state.classNames.forEach(x => {
            result += ` ${positionPrefix}-${x}`;
        });

        return result;
    };

    onOpen = (ref: ?HTMLElement) => {
        // $FlowFixMe:
        this.menu = ref;
        if (!this.menu) return;
        this.menu.style.position = 'absolute';
        this.menu.style.visibility = 'hidden';
        this.menu.style.display = 'block';
    };

    onClose = () => {
        if (!this.menu) return;
        this.menu.removeAttribute('style');
        this.menu = null;
    };

    render() {
        const {
            mentions,
            name,
            text,
            selectMention,
            MentionItemChild
        } = this.props;
        const isOpened = mentions && mentions.length > 0;
        const className = this.getClassName();

        return (
            <Portal isOpened={isOpened} onOpen={this.onOpen}>
                <ul className={className}>
                    {mentions.map(mention => (
                        <MentionItem
                            selected={mention.name === name}
                            key={mention.name}
                            confirmMention={this.confirmMention}
                            selectMention={selectMention}
                            {...{ mention, MentionItemChild, text }}
                        />
                    ))}
                </ul>
            </Portal>
        );
    }
}

export default MentionMenu;
