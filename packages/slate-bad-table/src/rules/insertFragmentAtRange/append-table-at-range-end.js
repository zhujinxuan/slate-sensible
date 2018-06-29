// @flow
import isSameWidth from './utils/isSameWidth';
import pasteSingleRow from './utils/pasteSingleRow';
import EditTablePosition from '../../utils/EditTablePosition';
import type Options from '../../options';
import { type typeRule } from './type';

// Apeend  the table at the range end
// 1. lastNodeAsText : true
// 2. range. end is at first row of table
// 3. fragment.last is a table with same width
function appendTableAtRangeEnd(opts: Options): typeRule {
    return (rootInsert, change, range, fragment, insertOptions, next) => {
        if (fragment.nodes.size === 0) {
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

        if (
            startPosition.isSameTable(endPosition) &&
            !startPosition.isAtStartOfTable()
        ) {
            return next(insertOptions);
        }

        if (!endPosition.isInTable() || !endPosition.isFirstRow()) {
            return next(insertOptions);
        }

        const { table, cellIndex, row } = endPosition;
        if (!isSameWidth(table, fragmentTable)) {
            return next(insertOptions);
        }

        const { document } = change.value;
        const { lastNodeAsText } = insertOptions;
        let nextTable = table;

        if (lastNodeAsText) {
            const fragmentRow = fragmentTable.nodes.last();
            const nextRow = pasteSingleRow(
                row,
                fragmentRow,
                0,
                cellIndex,
                true
            );
            nextTable = table.updateNode(nextRow);
        }

        const beforeRows = lastNodeAsText
            ? fragmentTable.nodes.pop()
            : fragmentTable.nodes;

        nextTable = nextTable.set('nodes', beforeRows.concat(nextTable.nodes));
        change.replaceNodeByKey(nextTable.key, nextTable, { normalize: false });

        fragment = fragment.set('nodes', fragment.nodes.pop());
        const prevBlock = document.getPreviousBlock(table.key);
        if (!prevBlock) {
            range = range.collapseToStartOf(fragmentTable);
            insertOptions = insertOptions.set('firstNodeAsText', false);
        } else {
            range = range.moveFocusToEndOf(prevBlock);
            if (startPosition.isSameTable(endPosition)) {
                range = range.moveToFocus();
            }
        }

        return rootInsert(
            change,
            range,
            fragment,
            insertOptions.set('lastNodeAsText', false)
        );
    };
}
export default appendTableAtRangeEnd;
