// @flow
//
import { type Change, type Document } from 'slate';
import type Debug from 'debug';
import { type Option } from '../type';

export type typeInsertFragment = (Change, Document, options?: Object) => Change;
function insertFragment(opts: Option, debug: Debug): typeInsertFragment {
    return (change: Change, fragment: Document, options?: Object = {}) => {
        debug({ change, fragment, options });
        const snapshot = !!options.snapshot;
        return opts.insertFragmentAtRange(
            change,
            change.value.selection,
            fragment,
            { snapshot, select: true }
        );
    };
}
export default insertFragment;
