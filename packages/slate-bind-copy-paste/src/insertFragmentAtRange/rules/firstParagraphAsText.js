// @flow
import { type Node } from 'slate';
import { type typeRule } from './type';
import isTextBlock from '../../utils/isTextBlock';
import getFirstBlock from '../../utils/getFirstBlock';

function insertTextNodesAtRange(change, range, nodes) {
    let startBlock = change.value.document.getClosestBlock(range.startKey);
    const blockPath = change.value.document.getPath(startBlock.key);
    const startChild = startBlock.getFurthestAncestor(range.startKey);

    if (!range.collapseToStart().isAtStartOf(startChild)) {
        change.splitDescendantsByKey(
            startChild.key,
            range.startKey,
            range.startOffset,
            { normalize: false }
        );

        startBlock = change.value.document.getDescendantAtPath(blockPath);
        const startText = startBlock.getNextText(range.startKey);

        if (range.startKey === range.endKey) {
            range = range.collapseToStartOf(startText);
        } else {
            range = range.moveAnchorToStartOf(startText);
        }
    }

    const insertIndex = startBlock.nodes.indexOf(
        startBlock.getFurthestAncestor(range.startKey)
    );

    nodes.forEach((n, index) =>
        change.insertNodeByKey(startBlock.key, insertIndex + index, n, {
            normalize: false
        })
    );
    return range;
}

const insertFirstParagraphAsText: typeRule = (
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

    const { firstNodeAsText } = opts;

    if (!firstNodeAsText) {
        return next(opts);
    }

    opts = opts.set('firstNodeAsText', false);

    // If the startBlock is void
    const { startKey } = range;
    const { document } = change.value;
    const ancestors = document.getAncestors(startKey);
    const voidParent = document.getClosestVoid(startKey);

    if (voidParent) {
        const container: Node = ancestors.find(
            (n, index) => voidParent === ancestors.get(index + 1)
        );

        const nextText = container.getNextText(voidParent.getLastText().key);

        if (!nextText) {
            range = range.collapseToStartOf(voidParent);
        } else if (range.startKey !== range.endKey) {
            range = range.moveAnchorToStartOf(nextText);
        } else {
            range = range.collapseToStartOf(nextText);
        }

        if (voidParent.object === 'block') {
            return rootInsert(change, range, fragment, opts);
        }
    }

    const firstNode = fragment.nodes.first();

    if (!isTextBlock(firstNode)) {
        return next(opts);
    }

    const insertBlock = getFirstBlock(firstNode);

    if (!insertBlock) {
        return next(opts);
    }

    const insertNodes = insertBlock.nodes;
    fragment = fragment.set('nodes', fragment.nodes.shift());

    // otherwise split node and insert
    range = insertTextNodesAtRange(change, range, insertNodes);
    return rootInsert(change, range, fragment, opts);
};

export default insertFirstParagraphAsText;
