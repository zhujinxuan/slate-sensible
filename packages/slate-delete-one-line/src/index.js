// @flow
import HotKeys from 'slate-hotkeys';
import Debug from 'debug';
import { findDOMRange } from 'slate-react';
import { Range, type Change, type Block } from 'slate';
import areTwoRangesSameLine from './utils/are-two-ranges-same-line';
import areTwoRectsSameLine from './utils/are-two-rects-same-line';

const debug = new Debug('slate:onKeyDown:plugins');

function onKeyDown(event: SyntheticKeyboardEvent<*>, change: Change) {
    const { value } = change;
    if (value.isExpanded) return undefined;
    if (HotKeys.isDeleteLineBackward(event)) {
        return deleteLineBackward(change);
    }
    return undefined;
}

function deleteLineBackward(change: Change) {
    const { value } = change;
    const { selection } = value;
    const { startBlock } = value;
    if (!startBlock || startBlock.isVoid) return undefined;

    let range = selection.isBackward ? selection.flip() : selection;
    range = range.moveAnchorToStartOf(startBlock);
    if (areTwoRangesSameLine(range)) return undefined;

    debug('delete one line');

    const rectBenchmark: ClientRect = findDOMRange(
        selection
    ).getBoundingClientRect();

    const blockOffset = findOffset(
        startBlock.getOffsetAtRange(selection),
        (offset: number) => {
            const rect = getRectAtOffset(startBlock, offset);
            return areTwoRectsSameLine(rect, rectBenchmark);
        }
    );

    const { key, offset } = getKeyAndOffsetAtOffset(startBlock, blockOffset);
    range = range.moveAnchorTo(key, offset);
    if (range.isExpanded) change.deleteAtRange(range);
    return change;
}

function getKeyAndOffsetAtOffset(block: Block, offset: number) {
    const texts = block.getTexts();
    let text = texts.find(t => {
        if (t.text.length > offset) {
            return true;
        }
        offset -= t.text.length;
        return false;
    });

    if (!text) {
        text = texts.last();
        offset = text.text.length;
    }
    const { key } = text;
    return { key, offset };
}

function getRectAtOffset(block: Block, index: number): ClientRect {
    const { key, offset } = getKeyAndOffsetAtOffset(block, index);
    const range = Range.create({
        anchorKey: key,
        focusKey: key,
        anchorOffset: offset,
        focusOffset: offset
    });
    return getRectFromRange(range);
}

function getRectFromRange(range: Range): ClientRect {
    const client = findDOMRange(range);
    return client.getBoundingClientRect();
}

function findOffset(offset: number, callback: number => boolean) {
    if (offset < 2) return offset;
    let left = 0;
    let mid = Math.floor(offset / 2);
    let right = offset;
    if (callback(left)) return left;
    const result = right;
    while (mid !== result && mid !== left) {
        if (callback(mid)) {
            right = mid;
            mid = Math.floor((left + right) / 2);
        } else {
            left = mid;
            mid = Math.floor((left + right) / 2);
        }
    }
    return right;
}

export default function() {
    return { onKeyDown };
}
