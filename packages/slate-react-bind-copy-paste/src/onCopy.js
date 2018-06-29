// @flow

import { Value, type Change, type Editor } from 'slate';
import { cloneFragment } from 'slate-react';
import type Debug from 'debug';
import { type Option } from './type';

function onCopy(opts: Option, debug: Debug) {
    return (
        event: SyntheticClipboardEvent<*>,
        change: Change,
        editor: Editor
    ): ?true => {
        debug('onCopy', { event });
        const { value } = change;
        const { document, selection } = value;
        const fragment = opts.getFragmentAtRange(document, selection);
        if (!fragment) return undefined;
        const { htmlSerializer } = opts;
        if (htmlSerializer) {
            event.clipboardData.setData(
                'text/html',
                htmlSerializer.serialize(Value.create({ document: fragment }))
            );
        } else {
            cloneFragment(event, value, fragment);
        }
        event.preventDefault();

        return true;
    };
}
export default onCopy;
