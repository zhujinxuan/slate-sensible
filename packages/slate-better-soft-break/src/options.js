// @flow

import { Record } from 'immutable';
import { type Value, type Change } from 'slate';

type typeOpts = {
    softBreakIn: Array<string>,
    shiftIn: Array<string>,
    ignoreWhen?: (event: SyntheticKeyboardEvent<*>, value: Value) => boolean,
    deleteAtRange?: (Change, Range, options?: Object) => Change
};

const defaultOpts: typeOpts = {
    softBreakIn: [],
    shiftIn: [],
    ignoreWhen: (event: SyntheticKeyboardEvent<*>, value: Value) => false,
    deleteAtRange: (change: Change, range: Range, options: Object = {}) =>
        change.deleteAtRAnge(range, options)
};
class Options extends Record(defaultOpts) {
    softBreakIn: Array<string>;
    shfitIn: Array<string>;
    ignoreWhen: (event: SyntheticKeyboardEvent<*>, value: Value) => boolean;
    deleteAtRange: (Change, Range, options?: Object) => Change;
}
export default Options;
export type { typeOpts };
