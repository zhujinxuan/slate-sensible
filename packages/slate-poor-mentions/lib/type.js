// @flow
import { type Change, type Range, type Value } from 'slate';
import { type ComponentType } from 'react';

export interface InterfaceUpdater {
    isActive: () => boolean;
    next: () => *;
    previous: () => *;
    changeHOF: () => void | (Change => *);
}

type Mention<T> = { ...T, text: string };
export type { Mention };

export type GetMentions<T: { name: string }> = Value => {
    text: null | string,
    range: null | Range,
    mentions: Array<Mention<T>>
};

export type MentionItemChildType<T: { name: string }> = ComponentType<
    Mention<T>
>;
