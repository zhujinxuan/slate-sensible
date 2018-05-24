// @flow

import { findRange } from 'slate-react';
import getWindow from 'get-window';
import { type Change } from 'slate';
import areVisiblyTheSame from './utils/areVisiblyTheSame';

function createPlugin(): Object {
    return { onSelect };
}

function onSelect(event, change: Change): ?true {
    const window = getWindow(event.target);
    const { value } = change;
    const { document } = value;
    const native = window.getSelection();

    if (!native.rangeCount) {
        return undefined;
    }
    const range = findRange(native, value);
    if (!range || !value.selection) return undefined;
    if (!range.anchorKey || !value.anchorKey) return undefined;
    if (!range.focusKey || !value.focusKey) return undefined;
    if (!range.isFocused || !value.isFocused) return undefined;
    if (areVisiblyTheSame(document, value.selection, range)) {
        return true;
    }
    return undefined;
}

export default createPlugin;
export { areVisiblyTheSame };
