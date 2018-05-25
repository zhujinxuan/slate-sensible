// @flow

import { Range } from 'slate';
import { findDOMRange } from 'slate-react';
import areTwoRectsSameLine from './are-two-rects-same-line';

type TowardsRect = ClientRect | Range;

export default function areSameLine(
    range1: TowardsRect,
    range2: TowardsRect
): boolean {
    const rect1 = convertToRect(range1);
    const rect2 = convertToRect(range2);
    return areTwoRectsSameLine(rect1, rect2);
}

export function convertToRect(range: TowardsRect): ClientRect {
    if (Range.isRange(range)) {
        const client = findDOMRange(range);
        return client.getBoundingClientRect();
    }

    if (
        !range ||
        typeof range.top !== 'number' ||
        typeof range.bottom !== 'number'
    ) {
        throw new TypeError(
            'slate-delete-one-line can only convert ClientRect or Range to ClientRect'
        );
    }

    const result: ClientRect = range;
    return result;
}
