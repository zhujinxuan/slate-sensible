// @flow
import { Record, type RecordOf } from 'immutable';
import { type Change, type Range } from 'slate';

export type DeleteAtRangeOptions = RecordOf<{
    deleteStartText: boolean,
    deleteEndText: boolean
}>;

export type typeRule = (
    (Change, Range, DeleteAtRangeOptions) => Change,
    Change,
    Range,
    DeleteAtRangeOptions,
    (DeleteAtRangeOptions) => Change
) => Change;

const defaultOptions: DeleteAtRangeOptions = Record({
    deleteStartText: false,
    deleteEndText: true
})();

export default defaultOptions;
