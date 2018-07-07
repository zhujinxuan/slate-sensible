// @flow

import { Record, type RecordOf } from 'immutable';
import { type Value, type Change } from 'slate';

type typeOpts = {
    softBreakIn: Array<string>,
    shiftIn: Array<string>,
    ignoreWhen: (event: SyntheticKeyboardEvent<*>, value: Value) => boolean,
    deleteAtRange: (Change, Range, options?: Object) => Change
};

export type Options = RecordOf<typeOpts>;

const defaultOpts: Options = Record({
    softBreakIn: [],
    shiftIn: [],
    ignoreWhen: (event: SyntheticKeyboardEvent<*>, value: Value) => false,
    deleteAtRange: (change: Change, range: Range, options: Object = {}) =>
        change.deleteAtRAnge(range, options)
})();

export default defaultOpts;
