// @flow
import { type Change } from 'slate';
import { findDOMRange } from 'slate-react';
import Debug from 'debug';
import areSameLine from '../utils/are-same-line';
import getKeyAndOffsetAtOffset from '../utils/get-key-and-offset-at-offset';
import findOffset from './helpers/find-offset';
import getRangeAtOffset from './helpers/get-range-at-offset';

const debug = new Debug('slate:onKeyDown:plugins');

export default function deleteLineForward(change: Change) {
    const { value } = change;
    const { selection } = value;
    const { startBlock } = value;
    if (!startBlock || startBlock.isVoid) return undefined;

    let range = selection.isBackward ? selection.flip() : selection;

    const rectBenchmark: ClientRect = findDOMRange(
        selection
    ).getBoundingClientRect();

    if (areSameLine(range.collapseToEndOf(startBlock), rectBenchmark)) {
        // To Fix bug of deleteLineForward
        change.deleteAtRange(range.moveFocusToEndOf(startBlock));
        return change;
    }

    debug('deleteforward');

    const startOffset = startBlock.getOffsetAtRange(selection);
    const textLength = startBlock.text.length;

    const callback = (restOffset: number) => {
        const offset = textLength - restOffset;
        const testRange = getRangeAtOffset(startBlock, offset);
        return areSameLine(testRange, rectBenchmark);
    };

    const blockOffset =
        textLength - findOffset(textLength - startOffset, callback);

    const { key, offset } = getKeyAndOffsetAtOffset(startBlock, blockOffset);
    range = range.moveFocusTo(key, offset);
    if (range.isExpanded) change.deleteAtRange(range);
    return change;
}
