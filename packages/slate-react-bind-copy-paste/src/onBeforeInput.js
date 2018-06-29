// @flow
import { type Change, type Editor } from 'slate';
import type Debug from 'debug';
import { type Changes } from './changes/index';
import { type Option } from './type';

export default function onBeforeInput(
    opts: Option,
    changes: Changes,
    debug: Debug
) {
    return (
        event: SyntheticInputEvent<*>,
        change: Change,
        editor: Editor
    ): ?true => {
        debug('onBeforeInput', event);
        event.preventDefault();
        changes.insertText(change, event.data);
        return true;
    };
}
