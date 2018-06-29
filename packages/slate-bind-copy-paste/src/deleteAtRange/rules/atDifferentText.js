// @flow
import { Text, type Node, type Change } from 'slate';
import { List } from 'immutable';
import { type typeRule } from './type';
import isStartByKey from './utils/isStartByKey';
import deleteBetweenNodes from './utils/deleteBetweenNodes';
import getFirstBlock from '../../utils/getFirstBlock';
import getLastBlock from '../../utils/getLastBlock';

const atDifferentText: typeRule = (rootDelete, change, range, opts, next) => {
    if (range.isCollapsed) {
        return next(opts);
    }

    const { startKey, endKey } = range;
    if (startKey === endKey) {
        return next(opts);
    }
    const { document } = change.value;
    const nextText = document.getNextText(startKey);
    if (!nextText) {
        return rootDelete(
            change,
            range.moveFocusToEndOf(document.getDescendant(startKey)),
            opts
        );
    }

    // Normalize the Range
    if (range.startOffset !== 0) {
        const voidParent = document.getClosestVoid(startKey);
        if (voidParent) {
            range = range.moveAnchorToStartOf(voidParent);
        }
    }

    if (range.endOffset !== 0) {
        const voidParent = document.getClosestVoid(endKey);
        if (voidParent) {
            range = range.moveFocusToEndOf(voidParent);
        }
    }

    // Determine the first completely removed and the last completely removed texts
    // as firstRemovedText and lastRemovedText
    const { startOffset, endOffset } = range;
    const { deleteStartText, deleteEndText } = opts;
    const startBlock = document.getClosestBlock(startKey);
    const endBlock = document.getClosestBlock(endKey);
    const startText = document.getDescendant(startKey);

    let firstRemovedText = document.getNextText(startKey);
    if (document.getClosestVoid(startKey)) {
        const voidParent = document.getClosestVoid(startKey);
        if (voidParent.object === 'block') {
            firstRemovedText = startText;
        } else {
            change.replaceNodeByKey(
                voidParent.key,
                Text.create('').set('key', startKey),
                { normalize: false }
            );
        }
    }
    if (startOffset === 0) {
        if (startBlock !== endBlock && isStartByKey(startBlock, startKey)) {
            firstRemovedText = startText;
        }
        if (deleteStartText) {
            firstRemovedText = startText;
        }
    }

    const endText = document.getDescendant(endKey);
    let lastRemovedText = document.getPreviousText(endKey);

    if (endBlock.isVoid) {
        // Delete the end void Block if the start is not hanging
        if (startOffset !== 0 || !isStartByKey(startBlock, startKey)) {
            lastRemovedText = endText;
        }
        // Delete the end void Block if the start is also a void block
        if (startBlock.isVoid) {
            lastRemovedText = endText;
        }
    }
    if (endOffset !== 0 && document.getClosestVoid(endKey)) {
        const voidParent = document.getClosestVoid(endKey);
        if (voidParent.object === 'block') {
            lastRemovedText = endText;
        } else {
            change.replaceNodeByKey(
                voidParent.key,
                Text.create('').set('key', endKey),
                { normalize: false }
            );
        }
    }
    if (deleteEndText && endText.text.length === endOffset) {
        lastRemovedText = endText;
    }

    if (
        lastRemovedText === firstRemovedText ||
        document.areDescendantsSorted(firstRemovedText.key, lastRemovedText.key)
    ) {
        deleteBetweenNodes(change, firstRemovedText.key, lastRemovedText.key);
    }

    if (startText !== firstRemovedText) {
        change.removeTextByKey(
            startKey,
            startOffset,
            startText.text.length - startOffset,
            { normalize: false }
        );
    }

    if (endText !== lastRemovedText) {
        change.removeTextByKey(endKey, 0, endOffset, { normalize: false });
    }

    if (!deleteStartText) {
        refindStartText(change, document, startKey, endKey);
    }
    if (!deleteEndText) {
        refindEndText(change, document, startKey, endKey);
    }

    // isHanging fix
    if (
        endBlock !== startBlock &&
        !startBlock.isVoid &&
        !endBlock.isVoid &&
        change.value.document.getDescendant(startBlock.key) &&
        change.value.document.getDescendant(endBlock.key)
    ) {
        const isHanging =
            endOffset === 0 &&
            isStartByKey(endBlock, endKey) &&
            isStartByKey(startBlock, startKey) &&
            startOffset === 0;
        if (!isHanging) {
            const newEndBlock = change.value.document.getDescendant(
                endBlock.key
            );
            const newStartBlock = change.value.document.getDescendant(
                startBlock.key
            );
            newEndBlock.nodes.forEach((c, index) => {
                change.moveNodeByKey(
                    c.key,
                    newStartBlock.key,
                    newStartBlock.nodes.size + index,
                    { normalize: false }
                );
            });

            change.removeNodeByKey(newEndBlock.key, { normalize: false });
        }
    }
    return change;
};

function refindStartText(
    change: Change,
    document: Node,
    startKey: string,
    endKey: string
) {
    if (change.value.document.getDescendant(startKey)) return;
    const startBlock = document.getClosestBlock(startKey);
    const endBlock = document.getClosestBlock(endKey);
    const startTextPlaceHolder = Text.create('').set('key', startKey);
    let newStartBlock = getLastBlock(
        change.value.document.getDescendant(startBlock.key)
    );
    if (!newStartBlock) {
        const oldPreviousBlock = document.getPreviousBlock(startBlock.key);
        if (oldPreviousBlock) {
            newStartBlock = getLastBlock(
                document.getDescendant(oldPreviousBlock.key)
            );
        }
    }
    if (newStartBlock) {
        if (newStartBlock.isVoid) {
            replaceVoidNode(change, newStartBlock, startKey);
            return;
        }
        change.insertNodeByKey(
            newStartBlock.key,
            newStartBlock.nodes.size,
            startTextPlaceHolder,
            { normalize: false }
        );
        return;
    }

    let newEndBlock = getFirstBlock(
        change.value.document.getDescendant(endBlock.key)
    );
    if (!newEndBlock) {
        newEndBlock = getFirstBlock(document.getNextBlock(endBlock.key));
    }
    if (!newEndBlock) return;

    if (newEndBlock.isVoid) {
        replaceVoidNode(change, newEndBlock, startKey);
        return;
    }
    change.insertNodeByKey(newEndBlock.key, 0, startTextPlaceHolder, {
        normalize: false
    });
}

function refindEndText(
    change: Change,
    document: Node,
    startKey: string,
    endKey: string
) {
    if (change.value.document.getDescendant(endKey)) return;
    const startBlock = document.getClosestBlock(startKey);
    const endBlock = document.getClosestBlock(endKey);
    const endTextPlaceHolder = Text.create('').set('key', endKey);
    let newEndBlock = change.value.document.getDescendant(endBlock.key);

    if (!newEndBlock) {
        const oldNextBlock = document.getNextBlock(endBlock.key);
        if (oldNextBlock) {
            newEndBlock = getFirstBlock(
                change.value.document.getDescendant(oldNextBlock.key)
            );
        }
    }

    if (newEndBlock && newEndBlock.isVoid) {
        if (newEndBlock.getDescendant(startKey)) return;
        replaceVoidNode(change, newEndBlock, endKey);
        return;
    }
    if (newEndBlock) {
        const insertIndex = newEndBlock.getDescendant(startKey)
            ? 0
            : 1 +
              newEndBlock.nodes.indexOf(
                  newEndBlock.getFurthestAncestor(startKey)
              );
        change.insertNodeByKey(
            newEndBlock.key,
            insertIndex,
            endTextPlaceHolder,
            { normalize: false }
        );
        return;
    }

    let newStartBlock = getLastBlock(
        change.value.document.getDescendant(startBlock.key)
    );
    if (!newStartBlock) {
        newStartBlock = getLastBlock(
            document.getDescendant(document.getPreviousBlock(startBlock.key))
        );
    }
    if (!newStartBlock) return;
    if (newStartBlock.isVoid) return;
    const insertIndex = newStartBlock.nodes.size;
    change.insertNodeByKey(newStartBlock.key, insertIndex, endTextPlaceHolder, {
        normalize: false
    });
}

function replaceVoidNode(change: Change, block: Node, key: string): void {
    if (block.object === 'inline') {
        change.replaceNodeByKey(block.key, Text.create('').set)('key', key);
        return;
    }
    change.replaceNodeByKey(
        block.key,
        block.set('nodes', List.of(Text.create(' ').set('key', key))),
        { normalize: false }
    );
}

export default atDifferentText;
