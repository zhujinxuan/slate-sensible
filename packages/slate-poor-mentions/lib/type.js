// @flow
import { type Change, type Range, type Value } from 'slate';

export interface InterfaceUpdater {
    isActive: () => boolean;
    next: () => *;
    previous: () => *;
    changeHOF: () => void | (Change => *);
}

export type Mention = { name: string, text: string };
export type GetMentions = Value => {
    text: null | string,
    range: null | Range,
    mentions: Array<Mention>
};
