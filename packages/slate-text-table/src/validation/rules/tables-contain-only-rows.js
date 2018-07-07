// @flow

import type { Node } from 'slate';
import type { Rule } from '../types';
import type Options from '../../options';
import makeEmptyRow from '../utils/make-empty-row';

/**
 * Rule that ensures tables only contain rows and at least one.
 */
export default function tablesContainOnlyRows(opts: Options): Rule {
    const isRow = node => node.type === opts.typeRow;

    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            // Figure out invalid rows
            const invalids = table.nodes.filterNot(isRow);

            // Figure out valid rows
            const add =
                invalids.size === table.nodes.size ? [makeEmptyRow(opts)] : [];

            if (invalids.isEmpty() && add.length === 0) {
                return null;
            }

            return {
                invalids,
                add
            };
        },

        /**
         * Replaces the node's children
         */
        normalize(
            change,
            node,
            { invalids = [], add = [] }: { invalids: Node[], add: Node[] }
        ) {
            // Remove invalids
            invalids.forEach(child =>
                change.removeNodeByKey(child.key, { normalize: false })
            );

            // Add valids
            add.forEach(child =>
                change.insertNodeByKey(node.key, 0, child, { normalize: false })
            );

            return change;
        }
    };
}
