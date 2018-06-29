// @flow
import { Record } from 'immutable';
import { type Change, type Range } from 'slate';

class DeleteAtRangeOptions extends Record({
    deleteStartText: false,
    deleteEndText: true
}) {
    deleteStartText: boolean;
    deleteEndText: boolean;
    merge: Object => DeleteAtRangeOptions;
    set: (string, *) => DeleteAtRangeOptions;
}

export type typeRule = (
    (Change, Range, DeleteAtRangeOptions) => Change,
    Change,
    Range,
    DeleteAtRangeOptions,
    (DeleteAtRangeOptions) => Change
) => Change;

export { DeleteAtRangeOptions };
