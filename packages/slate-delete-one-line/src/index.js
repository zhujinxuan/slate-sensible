// @flow
import HotKeys from 'slate-hotkeys';
import { type Change } from 'slate';
import deleteLineBackward from './changes/delete-line-backward';

function onKeyDown(event: SyntheticKeyboardEvent<*>, change: Change) {
    const { value } = change;
    if (value.isExpanded) return undefined;
    if (HotKeys.isDeleteLineBackward(event)) {
        return deleteLineBackward(change);
    }
    return undefined;
}

export default function() {
    return { onKeyDown };
}
