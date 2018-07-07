// @flow
import { Record, type RecordOf } from 'immutable';
import { type Change, type Range, type Document } from 'slate';

export type InsertAtRangeOptions = RecordOf<{
    lastNodeAsText: boolean,
    firstNodeAsText: boolean
}>;

export type typeRule = (
    (Change, Range, Document, InsertAtRangeOptions) => Change,
    Change,
    Range,
    Document,
    InsertAtRangeOptions,
    (InsertAtRangeOptions) => Change
) => Change;

const defaultOptions: InsertAtRangeOptions = Record({
    lastNodeAsText: true,
    firstNodeAsText: true
})();

export default defaultOptions;
