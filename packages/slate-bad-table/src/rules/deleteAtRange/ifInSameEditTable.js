// @flow
import { Range } from 'slate';
import { isStartByKey, isEndByKey } from 'slate-bind-copy-paste';
import type Options from '../../options';
import { type typeRule } from './type';

function ifInSameEditTable(opts: Options): typeRule {
    return (rootDelete, change, range, removeOptions, next) => {
        const { document } = change.value;
        const { startKey, endKey, startOffset, endOffset } = range;

        const startCell = document.getClosestBlock(startKey);
        if (!startCell || startCell.type !== opts.typeCell) {
            return next(removeOptions);
        }

        const table = document.getClosest(
            startKey,
            x => x.type === opts.typeTable
        );
        const endCell = document.getClosestBlock(endKey);
        if (!table || !table.hasDescendant(endCell.key)) {
            return next(removeOptions);
        }

        const { deleteStartText, deleteEndText } = removeOptions;
        if (startCell === endCell) {
            if (deleteEndText && deleteStartText) {
                return next(removeOptions.set('deleteStartText', false));
            }
            return next(removeOptions);
        }

        const startRow = document.getClosest(
            startKey,
            n => n.type === opts.typeRow
        );
        const endRow = document.getClosest(
            endKey,
            n => n.type === opts.typeRow
        );
        const endText = document.getDescendant(endKey);

        // Including multi-rows
        if (
            deleteStartText &&
            deleteEndText &&
            startOffset === 0 &&
            endOffset === endText.text.length
        ) {
            if (isStartByKey(table, startKey) && isEndByKey(table, endKey)) {
                change.removeNodeByKey(table.key, { normalize: false });
                return change;
            }
            if (
                isStartByKey(startRow, startKey) &&
                isEndByKey(endRow, endKey)
            ) {
                const startIndex = table.nodes.indexOf(startRow);
                const endIndex = table.nodes.indexOf(endRow);
                if (startIndex > endIndex) {
                    return change;
                }
                table.nodes.skipWhile(n => n !== startRow).find(row => {
                    change.removeNodeByKey(row.key, { normalize: false });
                    return row === endRow;
                });
                return change;
            }
        }

        if (startRow !== endRow) {
            // Delete the StartRow
            rootDelete(
                change,
                range.moveFocusToEndOf(startRow),
                removeOptions.set('deleteEndText', true)
            );
            const nextStartRow = table.nodes.get(
                table.nodes.indexOf(startRow) + 1
            );
            // Delete the middleRows
            if (nextStartRow !== endRow) {
                const nextEndRow = table.nodes.get(
                    table.nodes.indexOf(endRow) - 1
                );
                rootDelete(
                    change,
                    range
                        .moveAnchorToStartOf(nextStartRow)
                        .moveFocusToEndOf(nextEndRow),
                    removeOptions.merge({
                        deleteStartText: true,
                        deleteEndText: true
                    })
                );
            }
            // Delete the End Row
            return rootDelete(
                change,
                range.moveAnchorToStartOf(endRow),
                removeOptions.set('deleteStartText', true)
            );
        }

        rootDelete(
            change,
            range.moveFocusToEndOf(startCell),
            removeOptions.set('deleteStartText', false)
        );

        startRow.nodes
            .skipWhile(n => n !== startCell)
            .shift()
            .find(middleCell => {
                if (middleCell === endCell) return true;
                const cellRange = Range.create().moveToRangeOf(middleCell);
                rootDelete(
                    change,
                    cellRange,
                    removeOptions.merge({
                        deleteEndText: true,
                        deleteStartText: false
                    })
                );
                return false;
            });
        return rootDelete(
            change,
            range.moveAnchorToStartOf(endCell),
            removeOptions.set('deleteStartText', false)
        );
    };
}

export default ifInSameEditTable;
