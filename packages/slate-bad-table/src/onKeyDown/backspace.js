// @flow
import { type Change } from 'slate';
import type Options from '../options';

function backspace(opts: Options, change: Change): Change | void {
    const { value } = change;
    const { document } = value;
    if (value.isExpanded) {
        return undefined;
    }
    if (value.startOffset !== 0) {
        return undefined;
    }
    const { startKey } = value;
    const cell = document.getClosest(
        startKey,
        c => c.type === opts.typeBadCell
    );
    if (!cell) {
        return undefined;
    }
    if (startKey !== cell.getFirstText().key) {
        return undefined;
    }
    const lastText = document.getPreviousText(startKey);
    if (!lastText) {
        return undefined;
    }
    return change.collapseToEndOf(lastText);
}
export default backspace;
