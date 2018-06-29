// @flow

import { type Change, type Editor } from 'slate';
import { getEventTransfer } from 'slate-react';
import Debug from 'debug';
import { type Changes } from './changes/index';
import { type Option } from './type';

function onPaste(opts: Option, changes: Changes, debug: Debug) {
    return (
        event: SyntheticClipboardEvent<*>,
        change: Change,
        editor: Editor
    ): ?true => {
        debug('onPaste', { event });
        const { htmlSerializer } = opts;
        const transfer = getEventTransfer(event);
        debug('onPaste', { transfer });
        if (transfer.type === 'text') {
            const { text } = transfer;
            changes.insertText(change, text);
            return true;
        }
        let fragment;
        if (transfer.type === 'fragment') {
            fragment = transfer.fragment;
        } else if (htmlSerializer && transfer.type === 'html') {
            const result = htmlSerializer.deserialize(transfer.html);
            fragment = result.document ? result.document : result;
        }
        if (!fragment) return undefined;
        changes.insertFragment(change, fragment);
        return true;
    };
}

export default onPaste;
