// @flow
import { type Change, type Range, type Value } from 'slate';
import { type ComponentType } from 'react';

export interface InterfaceUpdater {
    isActive: () => boolean;
    next: () => *;
    previous: () => *;
    changeHOF: () => void | (Change => *);
}

export type GetMentions<T: { name: string }> = Value => {
    text: string,
    range: null | Range,
    mentions: Array<T>
};

export type MentionItemChildType<T: { name: string }> = ComponentType<{
    mention: T,
    text: string
}>;
