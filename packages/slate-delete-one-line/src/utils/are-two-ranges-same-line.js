// @flow
import { type Range } from 'slate';
import { findDOMRange } from 'slate-react';
import areTwoRectsSameLine from './are-two-rects-same-line';

export default function areRangeInSameLine(range: Range) {
    if (range.isCollapsed) return true;
    const range1 = range.collapseToStart();
    const range2 = range.collapseToEnd();
    const client1 = findDOMRange(range1);
    const client2 = findDOMRange(range2);

    if (!client1 || !client2) return true;

    return areTwoRectsSameLine(
        client1.getBoundingClientRect(),
        client2.getBoundingClientRect()
    );
}
