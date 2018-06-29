// @flow
// We can use default insertFragmentAtRange after PR 1553
// Waiting for merging

import { type typeRule } from './type';

const insertNodesAsBlocks: typeRule = (
    rootInsert,
    change,
    range,
    fragment,
    opts,
    next
) => {
    if (fragment.nodes.size === 0) {
        return next(opts);
    }

    range = range.collapseToStart();

    const splitBlock = change.value.document.getClosestBlock(range.startKey);
    let parentPath = change.value.document.getPath(splitBlock.key).slice(0, -1);

    while (splitBlock && !range.isAtStartOf(splitBlock)) {
        const voidParent = change.value.document.getClosest(
            range.startKey,
            n => n.isVoid
        );

        if (voidParent && !range.isAtStartOf(voidParent)) {
            range = range.collapseToStartOf(voidParent);

            if (range.isAtStartOf(splitBlock)) {
                break;
            }
        }

        if (range.isAtEndOf(splitBlock)) {
            const nextBlock = change.value.document.getNextBlock(
                splitBlock.key
            );

            if (!nextBlock) {
                const parent = change.value.document.getParent(splitBlock.key);
                const nextParent = parent.set(
                    'nodes',
                    parent.nodes.concat(fragment.nodes)
                );

                change.replaceNodeByKey(nextParent.key, nextParent, {
                    normalize: false
                });
                return change;
            }

            parentPath = change.value.document
                .getPath(nextBlock.key)
                .slice(0, -1);

            range = range.collapseToStartOf(nextBlock);
            break;
        }

        change.splitDescendantsByKey(
            splitBlock.key,
            range.startKey,
            range.startOffset,
            { normalize: false }
        );

        const parent = change.value.document.getParent(splitBlock.key);
        const startText = parent.getNextText(range.startKey);
        range = range.collapseToStartOf(startText);
        break;
    }

    const parent = change.value.document.getDescendantAtPath(parentPath);
    const startBlock = parent.getFurthestAncestor(range.startKey);
    const insertIndex = parent.nodes.indexOf(startBlock);

    fragment.nodes.forEach((block, index) =>
        change.insertNodeByKey(parent.key, insertIndex + index, block, {
            normalize: false
        })
    );
    return change;
};

export default insertNodesAsBlocks;
