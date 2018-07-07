// @flow

import { type Range, type Node } from 'slate';
import arePointsEquivalent from './are-points-equivalent';
import type { Point } from './Point';

function getStartPoint(range: Range): Point {
    return { key: range.startKey, offset: range.startOffset };
}

function getEndPoint(range: Range) {
    return { key: range.endKey, offset: range.endOffset };
}

function areVisiblyTheSame(node: Node, range1: Range, range2: Range): boolean {
    if (
        !arePointsEquivalent(node, getStartPoint(range1), getStartPoint(range2))
    ) {
        return false;
    }

    if (range1.isCollapsed && range2.isCollapsed) {
        return true;
    }

    return arePointsEquivalent(node, getEndPoint(range1), getEndPoint(range2));
}

export default areVisiblyTheSame;
