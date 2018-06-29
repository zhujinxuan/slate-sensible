// @flow
import { List } from 'immutable';
import { Text } from 'slate';
import { type typeRule } from './type';
import isStartByKey from './utils/isStartByKey';
import isEndByKey from './utils/isEndByKey';
import deleteBetweenNodes from './utils/deleteBetweenNodes';

const atWholeDocument: typeRule = (rootDelete, change, range, opts, next) => {
    if (range.isCollapsed) return change;
    const { startKey, endKey, startOffset, endOffset } = range;
    const { document } = change.value;
    const { isFocused } = change.value.selection;
    if (startOffset !== 0) return next(opts);
    if (!isStartByKey(document, startKey)) return next(opts);
    if (startKey === endKey) return next(opts);

    if (!isEndByKey(document, endKey)) return next(opts);

    if (endOffset !== document.getDescendant(endKey).text.length) {
        return next(opts);
    }

    if (document.nodes.size === 0) return change;

    const { deleteStartText, deleteEndText } = opts;

    if (deleteStartText && deleteEndText) {
        document.nodes.forEach(n =>
            change.removeNodeByKey(n.key, { normalize: false })
        );
        return change;
    }

    const startText = deleteStartText
        ? null
        : Text.create('').set('key', startKey);
    const endText = deleteEndText ? null : Text.create('').set('key', endKey);

    let newNodes = startText ? List.of(startText) : List();
    newNodes = endText ? newNodes.push(endText) : newNodes;
    const leafBlock = document.nodes.find(
        b => b.object === 'block' && b.isLeafBlock() && !b.isVoid
    );

    if (leafBlock) {
        document.nodes.forEach(n => {
            if (n !== leafBlock) {
                change.removeNodeByKey(n.key, { normalize: false });
                return;
            }

            const nextBlock = leafBlock.set('nodes', newNodes);

            change.replaceNodeByKey(nextBlock.key, nextBlock, {
                normalize: false
            });
        });

        if (isFocused) {
            change.collapseToStartOf(change.value.document).focus();
        }

        return change;
    }

    const lastTextBlock = document.getBlocks().findLast(b => !b.isVoid);

    if (lastTextBlock) {
        const furthestAncestor = document.getFurthestAncestor(
            lastTextBlock.key
        );
        const ancestors = furthestAncestor.getAncestors(lastTextBlock.key);
        let nextBlock = lastTextBlock.set('nodes', newNodes);

        ancestors.findLast((n, index) => {
            nextBlock = n.set('nodes', List.of(nextBlock));
            return false;
        });

        document.nodes.forEach(n => {
            if (n !== furthestAncestor) {
                change.removeNodeByKey(n.key, { normalize: false });
                return;
            }

            change.replaceNodeByKey(nextBlock.key, nextBlock, {
                normalize: false
            });
        });

        if (isFocused) {
            change.collapseToStartOf(change.value.document).focus();
        }
        return change;
    }

    const firstKey = deleteStartText
        ? startKey
        : document.getNextText(startKey).key;
    const lastKey = deleteEndText
        ? endKey
        : document.getPreviousText(endKey).key;
    deleteBetweenNodes(change, firstKey, lastKey);

    if (isFocused) {
        change.collapseToStartOf(change.value.document).focus();
    }
    return change;
};

export default atWholeDocument;
