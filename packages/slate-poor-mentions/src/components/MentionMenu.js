// @flow

import React, { Component } from 'react';
import { findDOMRange } from 'slate-react';
import { type Value, type Change } from 'slate';
import Portal from './Portal';
import MentionItem from './MentionItem';
import { type MentionItemChildType } from '../type';
import applyBestPosition from '../utils/apply-best-position';

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

class MentionMenu<T: { name: string }> extends Component<Props<T>> {
    menu: ?HTMLElement;
    componentDidMount() {
        this.adjustPosition();
    }

    componentDidUpdate() {
        this.adjustPosition();
    }

    adjustPosition = () => {
        const { menu } = this;
        if (!menu) return;
        hideWithRect(menu);
        const { mentions, value } = this.props;
        if (mentions.length === 0) {
            return;
        }
        const domRange = findDOMRange(value.selection, window);
        if (!domRange) {
            return;
        }
        applyBestPosition(domRange, menu);
        menu.style.visibility = 'visible';
    };

    confirmMention = () => {
        const { changeHOF, submitChange } = this.props;
        const toChange = changeHOF();
        if (!toChange) {
            return;
        }
        submitChange(toChange);
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

        return (
            <Portal isOpened={isOpened} onOpen={this.onOpen}>
                <ul className="RichEditor-mention-menu">
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
