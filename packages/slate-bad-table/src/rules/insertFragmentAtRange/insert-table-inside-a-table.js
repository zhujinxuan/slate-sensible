// @flow
import { type Node } from 'slate';
import isSameWidth from './utils/isSameWidth';
import pasteSingleRow from './utils/pasteSingleRow';
import EditTablePosition from '../../utils/EditTablePosition';
import type Options from '../../options';
import { type typeRule } from './type';

// Only when firstNodeAsText === true && lastNodeAsText === true && fragment.nodes only includes a table with same width
function insertTableInsideTable(opts: Options): typeRule {
    return (rootInsert, change, range, fragment, insertOptions, next) => {
        if (fragment.nodes.size !== 1) {
            return next(insertOptions);
        }
        const { lastNodeAsText, firstNodeAsText } = insertOptions;
        if (!lastNodeAsText || !firstNodeAsText) {
            return next(insertOptions);
        }
        const fragmentTable = fragment.nodes.last();
        if (fragmentTable.type !== opts.typeTable) {
            return next(insertOptions);
        }
        const startPosition = EditTablePosition.create({
            node: change.value.document,
            range: range.collapseToStart(),
            opts
        });
        const endPosition = EditTablePosition.create({
            node: change.value.document,
            range: range.collapseToEnd(),
            opts
        });

        if (!startPosition.isInTable() || !endPosition.isInTable()) {
            return next(insertOptions);
        }

        if (!startPosition.isSameTable(endPosition)) {
            return next(insertOptions);
        }

        const { table } = startPosition;

        if (!isSameWidth(table, fragmentTable)) {
            return next(insertOptions);
        }

        const startRow = startPosition.row;
        const endRow = endPosition.row;

        if (startPosition.isSameRow(endPosition)) {
            const fragmentRow = fragmentTable.nodes.first();
            const nextRow = pasteSingleRow(
                startRow,
                fragmentRow,
                startPosition.cellIndex,
                endPosition.cellIndex
            );
            change.replaceNodeByKey(nextRow.key, nextRow, { normalize: false });
            return change;
        }

        let middleRows = fragmentTable.nodes;
        let nextTable: Node = table;
        if (firstNodeAsText) {
            const fragmentRow = middleRows.first();
            middleRows = middleRows.shift();
            const nextRow = pasteSingleRow(
                startRow,
                fragmentRow,
                startPosition.cellIndex,
                -1
            );
            nextTable = nextTable.updateNode(nextRow);
        }

        if (lastNodeAsText && middleRows.size > 0) {
            const fragmentRow = middleRows.last();
            middleRows = middleRows.pop();
            const nextRow = pasteSingleRow(
                endRow,
                fragmentRow,
                0,
                endPosition.cellIndex
            );
            nextTable = nextTable.updateNode(nextRow);
        }

        nextTable = nextTable.set(
            'nodes',
            nextTable.nodes
                .take(startPosition.rowIndex + 1)
                .concat(
                    middleRows,
                    nextTable.nodes.skip(startPosition.rowIndex + 1)
                )
        );
        change.replaceNodeByKey(nextTable.key, nextTable, { normalize: false });
        return change;
    };
}

export default insertTableInsideTable;
