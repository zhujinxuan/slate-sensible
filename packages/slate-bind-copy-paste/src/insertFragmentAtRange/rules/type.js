// @flow
import { Record } from 'immutable';
import { type Change, type Range, type Document } from 'slate';

class InsertAtRangeOptions extends Record({
    lastNodeAsText: true,
    firstNodeAsText: true
}) {
    lastNodeAsText: boolean;
    firstNodeAsText: boolean;
    merge: Object => InsertAtRangeOptions;
    set: (string, *) => InsertAtRangeOptions;
}

export type typeRule = (
    (Change, Range, Document, InsertAtRangeOptions) => Change,
    Change,
    Range,
    Document,
    InsertAtRangeOptions,
    (InsertAtRangeOptions) => Change
) => Change;

export { InsertAtRangeOptions };
