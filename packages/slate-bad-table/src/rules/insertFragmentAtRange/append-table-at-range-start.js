// @flow
import isSameWidth from './utils/isSameWidth';
import pasteSingleRow from './utils/pasteSingleRow';
import EditTablePosition from '../../utils/EditTablePosition';
import type Options from '../../options';
import { type typeRule } from './type';

// Append at the table end when:
// 1. range.start is in the end row of a table
// 2. firstNodeAsText: true
// 3. fragment.nodes.first is a table with same width
//
function appendTableAtRangeStart(opts: Options): typeRule {
    return (rootInsert, change, range, fragment, insertOptions, next) => {
        if (fragment.nodes.size === 0) {
            return next(insertOptions);
        }
        const fragmentTable = fragment.nodes.first();

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

        if (
            !startPosition.isInTable() ||
            startPosition.isSameTable(endPosition) ||
            !startPosition.isLastRow()
        ) {
            return next(insertOptions);
        }

        const { table, cellIndex, row } = startPosition;

        if (!isSameWidth(table, fragmentTable)) {
            return next(insertOptions);
        }

        const { document } = change.value;
        const { firstNodeAsText } = insertOptions;
        let nextTable = table;

        if (firstNodeAsText) {
            const fragmentRow = fragmentTable.nodes.first();
            const nextRow = pasteSingleRow(row, fragmentRow, cellIndex, -1);
            nextTable = table.updateNode(nextRow);
        }

        const afterRows = firstNodeAsText
            ? fragmentTable.nodes.shift()
            : fragmentTable.nodes;

        nextTable = nextTable.set('nodes', nextTable.nodes.concat(afterRows));
        change.replaceNodeByKey(nextTable.key, nextTable, { normalize: false });

        fragment = fragment.deleteIn(['nodes', 0]);
        const nextBlock = document.getNextBlock(table.key);
        if (!nextBlock) {
            range = range.collapseToEndOf(fragmentTable);
            insertOptions = insertOptions.set('lastNodeAsText', false);
        } else {
            range = range.moveAnchorToStartOf(nextBlock);
            if (startPosition.isSameTable(endPosition)) {
                range = range.moveToAnchor();
            }
        }
        return rootInsert(
            change,
            range,
            fragment,
            insertOptions.set('firstNodeAsText', false)
        );
    };
}
export default appendTableAtRangeStart;
