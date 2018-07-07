// @flow

import type { Node } from 'slate';
import type { Rule } from '../types';
import type Options from '../../options';

/**
 * Rule to enforce cells are always surrounded by a row.
 */
export default function cellsWithinTable(opts: Options): Rule {
    return {
        match(node) {
            return (
                (node.object === 'document' || node.object === 'block') &&
                node.type !== opts.typeRow
            );
        },

        // Find child cells nodes not in a row
        validate(node) {
            const cells = node.nodes.filter(n => n.type === opts.typeCell);

            if (cells.isEmpty()) {
                return undefined;
            }

            return {
                cells
            };
        },

        // If any, wrap all cells in a row block
        normalize(change, node, { cells }: { cells: Node[] }) {
            cells.forEach(cell =>
                change.wrapBlockByKey(cell.key, opts.typeRow, {
                    normalize: false
                })
            );

            return change;
        }
    };
}
