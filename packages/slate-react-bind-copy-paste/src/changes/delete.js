// @flow
import { type Change } from 'slate';
import type Debug from 'debug';
import { type Option } from '../type';

export type typeDelete = (Change, options?: Object) => Change;
function deleteAtCurrentRange(opts: Option, debug: Debug) {
    return (change: Change, options?: Object = { snapshot: true }): Change => {
        debug('delete', { change, options });
        const { snapshot }: { snapshot: boolean } = options;
        opts.deleteAtRange(change, change.value.selection, { snapshot });
        change.collapseToStart();
        return change;
    };
}
export default deleteAtCurrentRange;
