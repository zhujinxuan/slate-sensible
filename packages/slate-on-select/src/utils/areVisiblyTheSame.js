// @flow

import { type Range, type Node } from 'slate';

function areVisiblyTheSame(node: Node, range1: Range, range2: Range): boolean {
    if (range1.isCollapsed && range2.isCollapsed) {
        return areVisiblyCollapsedTheSame(node, range1, range2);
    }

    if (range1.isCollapsed !== range2.isCollapsed) return false;
    if (
        !areVisiblyCollapsedTheSame(
            node,
            range1.collapseToStart(),
            range2.collapseToEnd()
        )
    )
        return false;
    return areVisiblyCollapsedTheSame(
        node,
        range1.collapseToEnd(),
        range2.collapseToEnd()
    );
}

function areVisiblyCollapsedTheSame(
    node: Node,
    range1: Range,
    range2: Range
): boolean {
    if (!range1.isCollapsed || !range2.isCollapsed) return false;
    const { startKey, startOffset } = range1;
    const { endKey, endOffset } = range2;
    if (startKey === endKey) return startOffset === endOffset;
    if (!node.getDescendant(startKey) || !node.getDescendant(endKey))
        return false;
    if (endOffset === 0 && startOffset !== 0)
        return areVisiblyCollapsedTheSame(node, range2, range1);
    if (startOffset !== 0) return false;

    if (node.getClosestBlock(startKey) !== node.getClosestBlock(endKey)) {
        return false;
    }

    const endText = node.getDescendant(endKey);
    if (endOffset !== endText.text.length) return false;
    let previousText = node.getPreviousText(startKey);

    while (
        previousText &&
        previousText.key !== endKey &&
        previousText.text.length === 0
    ) {
        previousText = node.getPreviousText(previousText.key);
    }
    return previousText && previousText.key === endKey;
}

export default areVisiblyTheSame;
