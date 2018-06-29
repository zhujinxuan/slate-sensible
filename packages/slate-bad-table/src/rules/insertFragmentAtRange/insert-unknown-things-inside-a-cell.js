// @flow
import { isTextBlock, getFirstBlock } from 'slate-bind-copy-paste';
import { Text } from 'slate';
import { List } from 'immutable';
import type Options from '../../options';
import { type typeRule } from './type';

function insertUnknownInSameCell(opts: Options): typeRule {
    return (rootInsert, change, range, fragment, insertOptions, next) => {
        if (fragment.nodes.size === 0) {
            return next(insertOptions);
        }
        const { document } = change.value;
        const { startKey, endKey } = range;
        const startCell = document.getClosestBlock(startKey);
        const endCell = document.getClosestBlock(endKey);
        if (startCell !== endCell) {
            return next(insertOptions);
        }

        if (startCell.type !== opts.typeCell) {
            return next(insertOptions);
        }
        if (!opts.allowSoftBreak) {
            if (fragment.nodes.size > 1) {
                return next(insertOptions);
            }
            const firstNode = fragment.nodes.first();
            if (firstNode.text.indexOf('\n') !== -1) {
                return next(insertOptions);
            }
            if (!isTextBlock(firstNode)) {
                return next(insertOptions);
            }
        }
        if (fragment.nodes.find(n => !isTextBlock(n))) {
            return next(insertOptions);
        }
        const child = startCell.getFurthestAncestor(startKey);
        const { startOffset } = range;
        change.splitDescendantsByKey(child.key, startKey, startOffset, {
            normalize: false
        });
        const insertIndex = startCell.nodes.indexOf(child) + 1;
        let insertNodes = List.of();
        fragment.nodes.forEach(n => {
            insertNodes = insertNodes.concat(getFirstBlock(n).nodes);
            if (n !== fragment.nodes.last()) {
                insertNodes = insertNodes.push(Text.create('\n'));
            }
        });
        insertNodes.forEach((n, index) =>
            change.insertNodeByKey(startCell.key, insertIndex + index, n, {
                normalize: false
            })
        );
        return change;
    };
}
export default insertUnknownInSameCell;
