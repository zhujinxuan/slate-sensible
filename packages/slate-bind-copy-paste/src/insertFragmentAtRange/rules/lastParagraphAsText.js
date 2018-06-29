// @flow
import { type Node, type Range, type Change } from 'slate';
import { type typeRule } from './type';
import isTextBlock from '../../utils/isTextBlock';
import getLastBlock from '../../utils/getLastBlock';

function insertTextNodesAtRange(
    change: Change,
    range: Range,
    lastNode: Node,
    insertBlock: Node
): Range {
    const endBlock = change.value.document.getClosestBlock(range.endKey);
    let parent = change.value.document.getParent(endBlock.key);
    const parentPath = change.value.document.getPath(parent.key);
    if (!range.collapseToEnd().isAtStartOf(endBlock)) {
        change.splitDescendantsByKey(
            endBlock.key,
            range.endKey,
            range.endOffset,
            { normalize: false }
        );
        parent = change.value.document.getDescendantAtPath(parentPath);
        const endText = parent.getNextText(range.endKey);
        range = range.moveFocusToStartOf(endText);
    }
    const insertIndex = parent.nodes.indexOf(
        parent.getFurthestAncestor(range.endKey)
    );
    change.insertNodeByKey(parent.key, insertIndex, lastNode, {
        normalize: false
    });
    parent = change.value.document.getDescendantAtPath(parentPath);
    const blockToRemove = parent.getClosestBlock(range.endKey);
    blockToRemove.nodes.forEach((n, index) =>
        change.insertNodeByKey(
            insertBlock.key,
            insertBlock.nodes.size + index,
            n,
            { normalize: false }
        )
    );
    change.removeNodeByKey(blockToRemove.key, { normalize: false });
}

const insertLastParagraphAsText: typeRule = (
    rootInsert,
    change,
    range,
    fragment,
    opts,
    next
) => {
    if (!fragment.nodes.size) {
        return next(opts);
    }

    const { lastNodeAsText } = opts;
    if (!lastNodeAsText) {
        return next(opts);
    }

    if (range.endOffset !== 0) {
        if (range.starKey !== range.endKey) {
            range = range.moveFocusTo(range.endKey, 0);
        } else {
            range = range.moveFocusTo(range.endKey, 0).moveToFocus();
        }
    }

    opts = opts.set('lastNodeAsText', false);
    const { endKey } = range;
    const { document } = change.value;

    const voidParent = document.getClosestVoid(endKey);

    if (voidParent) {
        if (voidParent.object === 'block') {
            return rootInsert(change, range, fragment, opts);
        }
        range = range.collapseToStartOf(voidParent);
    }

    const lastNode = fragment.nodes.last();
    if (!isTextBlock(lastNode)) {
        return next(opts);
    }
    const insertBlock = getLastBlock(lastNode);
    if (!insertBlock) {
        return next(opts);
    }

    fragment = fragment.set('nodes', fragment.nodes.pop());
    insertTextNodesAtRange(change, range, lastNode, insertBlock);
    if (range.startKey === range.endKey) {
        range = range.collapseToStartOf(insertBlock);
    } else {
        range = range.moveFocusToStartOf(insertBlock);
    }
    return rootInsert(change, range, fragment, opts);
};

export default insertLastParagraphAsText;
