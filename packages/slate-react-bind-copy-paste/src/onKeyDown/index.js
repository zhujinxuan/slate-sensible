// @flow
import { type Change, type Editor } from 'slate';
import isHotKey from 'is-hotkey';
import Debug from 'debug';
import { type Option } from '../type';
import { type Changes } from '../changes/index';

const HOTKEYS = {
    SPLITBLOCK: (event: SyntheticKeyboardEvent<*>) => isHotKey('enter', event),
    DELETE: (event: SyntheticKeyboardEvent<*>) => isHotKey('backspace', event)
};

const debug = new Debug('slate:event:customized');

export default function onKeyDown(opts: Option, changes: Changes) {
    return (
        event: SyntheticKeyboardEvent<*>,
        change: Change,
        editor: Editor
    ): ?true => {
        debug('onKeyDown', { event });
        if (HOTKEYS.SPLITBLOCK(event)) {
            changes.splitBlock(change);
            return true;
        }
        if (HOTKEYS.DELETE(event) && change.value.isExpanded) {
            changes.delete(change);
            return true;
        }
        return undefined;
    };
}
