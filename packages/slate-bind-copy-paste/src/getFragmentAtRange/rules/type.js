// @flow
import { Record } from 'immutable';
import { type Node, type Range, type Document } from 'slate';

class GetAtRangeOptions extends Record({}) {}

export type typeRule = (
    (Node, Range, GetAtRangeOptions) => Document,
    Node,
    Range,
    GetAtRangeOptions,
    (GetAtRangeOptions) => Document
) => Document;

export { GetAtRangeOptions };
