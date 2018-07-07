// @flow

import { type Node } from 'slate';
import type { Point } from './Point';

export default function arePointsEquivalent(
    node: Node,
    point1: Point,
    point2: Point
): boolean {
    const { key: key1, offset: offset1 } = point1;
    const { key: key2, offset: offset2 } = point2;
    if (key1 === key2) return offset1 === offset2;
    if (key1 !== 0 && key2 !== 0) return false;

    const block = node.getClosestBlock(key1);
    if (!block || block !== node.getClosestBlock(key2)) return false;
    const offset1Sum = block.getOffset(key1) + offset1;
    const offset2Sum = block.getOffset(key2) + offset2;
    return offset1Sum === offset2Sum;
}
