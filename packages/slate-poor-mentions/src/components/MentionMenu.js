// @flow

import React, { Component } from 'react';
import { findDOMRange } from 'slate-react';
import { type Value, type Change } from 'slate';
import Portal from 'react-portal';
import MentionItem from './MentionItem';
import { type MentionItemChildType } from '../type';

function getRect(selectionDOMRange: Range): ClientRect {
    const rect = selectionDOMRange.getBoundingClientRect();
    return rect;
}

function hideWithRect(dom: HTMLElement) {
    dom.style.position = 'absolute';
    dom.style.visibility = 'hidden';
    dom.style.display = 'block';
    dom.style.left = '-1000px';
    dom.style.top = '-1000px';
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
    menu: null | HTMLUListElement;
    componentDidMount() {
        this.adjustPosition();
    }

    componentDidUpdate() {
        this.adjustPosition();
    }

    adjustPosition = () => {
        const menu = this.menu;
        if (!menu) {
            return;
        }
        const { mentions, value } = this.props;
        if (mentions.length === 0) {
            return;
        }
        const domRange = findDOMRange(value.selection, window);
        if (!domRange) {
            return;
        }
        const { left, top, bottom } = getRect(domRange);
        hideWithRect(menu);
        const { width, height } = menu.getBoundingClientRect();

        if (left + width < window.innerWidth) {
            menu.style.left = `${left + window.scrollX}px`; // eslint-disable-line no-mixed-operators
        } else {
            menu.style.left = `${left - width + window.scrollX} px`;
        }

        if (bottom + height < window.innerHeight) {
            menu.style.top = `${bottom + window.scrollY}px`;
        } else {
            menu.style.top = `${top - height - 34 + window.scrollY}px`;
        }

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

    onOpen = (ref: HTMLElement) => {
        // $FlowFixMe:
        this.menu = ref.firstChild;
        if (this.menu) {
            // $FlowFixMe:
            this.menu.style.position = 'absolute';
            // $FlowFixMe:
            this.menu.style.visibility = 'hidden';
            // $FlowFixMe:
            this.menu.style.display = 'block';
        }
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
                <ul className={'RichEditor-mention-menu'}>
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
