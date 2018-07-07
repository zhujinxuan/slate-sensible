// @flow

import type { Node } from 'slate';
import type { Rule } from '../types';
import type Options from '../../options';
import makeEmptyCell from '../utils/make-empty-cell';

/**
 * A rule that ensures rows contains only cells, and
 * as much cells as there is columns in the table.
 */
export default function rowsContainRequiredColumns(opts: Options): Rule {
    const isRow = node => node.type === opts.typeRow;
    const isCell = node => node.type === opts.typeCell;
    const countCells = row => row.nodes.count(isCell);

    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const rows = table.nodes.filter(isRow);

            // The number of column this table has
            const columns = rows.reduce(
                (count, row) => Math.max(count, countCells(row)),
                1
            ); // Min 1 column

            // else normalize, by padding with empty cells
            const invalidRows = rows
                .map(row => {
                    const cells = countCells(row);
                    const invalids = row.nodes.filterNot(isCell);

                    // Row is valid: right count of cells and no extra node
                    if (invalids.isEmpty() && cells === columns) {
                        return null;
                    }

                    // Otherwise, remove the invalids and append the missing cells
                    return {
                        row,
                        invalids,
                        add: columns - cells
                    };
                })
                .filter(Boolean);

            return invalidRows.size > 0 ? invalidRows : null;
        },

        /**
         * Updates by key every given nodes
         */
        normalize(change, node, rows: Node[]) {
            rows.forEach(({ row, invalids, add }) => {
                invalids.forEach(child => {
                    change.removeNodeByKey(child.key, { normalize: false });
                });

                for (let ii = add; ii > 0; ii -= 1) {
                    const cell = makeEmptyCell(opts);

                    change.insertNodeByKey(row.key, 0, cell, {
                        normalize: false
                    });
                }
            });

            return change;
        }
    };
}
