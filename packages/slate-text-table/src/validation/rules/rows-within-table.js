// @flow

import type { Node } from 'slate';
import type { Rule } from '../types';
import type Options from '../../options';
import { createAlign } from '../../utils';

/**
 * Rule to enforce rows are always surrounded by a table.
 */
export default function rowsWithinTable(opts: Options): Rule {
    return {
        match(node) {
            return (
                (node.object === 'document' || node.object === 'block') &&
                node.type !== opts.typeTable
            );
        },

        // Find child cells nodes not in a row
        validate(node) {
            const rows = node.nodes.filter(n => n.type === opts.typeRow);

            if (rows.isEmpty()) {
                return undefined;
            }

            return {
                rows
            };
        },

        // If any, wrap all cells in a row block
        normalize(change, node, { rows }: { rows: Node[] }) {
            rows.forEach(row =>
                change.wrapBlockByKey(
                    row.key,
                    {
                        type: opts.typeTable,
                        data: {
                            presetAlign: createAlign(row.nodes.size)
                        }
                    },
                    { normalize: false }
                )
            );

            return change;
        }
    };
}
