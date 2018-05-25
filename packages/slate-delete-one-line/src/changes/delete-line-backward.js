// @flow
import { Range, type Change, type Block } from 'slate';
import { findDOMRange } from 'slate-react';
import Debug from 'debug';
import areSameLine from '../utils/are-same-line';
import getKeyAndOffsetAtOffset from '../utils/get-key-and-offset-at-offset';
import findOffset from './helpers/find-offset';

const debug = new Debug('slate:onKeyDown:plugins');

export default function deleteLineBackward(change: Change) {
    const { value } = change;
    const { selection } = value;
    const { startBlock } = value;
    if (!startBlock || startBlock.isVoid) return undefined;

    let range = selection.isBackward ? selection.flip() : selection;
    range = range.moveAnchorToStartOf(startBlock);
    if (areSameLine(range)) return undefined;

    debug('delete one line');

    const rectBenchmark: ClientRect = findDOMRange(
        selection
    ).getBoundingClientRect();

    const blockOffset = findOffset(
        startBlock.getOffsetAtRange(selection),
        (offset: number) => {
            const testRange = getRangeAtOffset(startBlock, offset);
            return areSameLine(testRange, rectBenchmark);
        }
    );

    const { key, offset } = getKeyAndOffsetAtOffset(startBlock, blockOffset);
    range = range.moveAnchorTo(key, offset);
    if (range.isExpanded) change.deleteAtRange(range);
    return change;
}

function getRangeAtOffset(block: Block, index: number): Range {
    const { key, offset } = getKeyAndOffsetAtOffset(block, index);
    return Range.create({
        anchorKey: key,
        focusKey: key,
        anchorOffset: offset,
        focusOffset: offset
    });
}
