// @flow
import { type Node } from 'slate';
import { createAlign } from '../utils';
import type Options from '../options';
import type { Validator, Rule } from './types';
import noBlocksWithinCell from './rules/no-blocks-within-cell';
import cellsWithinTable from './rules/cells-within-table';
import rowsWithinTable from './rules/rows-within-table';
import tablesContainOnlyRows from './rules/tables-contain-only-rows';
import rowsContainRequiredColumns from './rules/rows-contain-required-columns';

/**
 * Returns a validateNode function, handling validation specific to tables that
 * cannot be expressed using the schema.
 */
function validateNode(opts: Options): Validator {
    const rules = [
        noBlocksWithinCell(opts),
        cellsWithinTable(opts),
        rowsWithinTable(opts),
        tablesContainOnlyRows(opts),
        rowsContainRequiredColumns(opts),
        tableContainAlignData(opts)
    ];
    const validators = rules.map(toValidateNode);

    return function validateTableNode(node) {
        let changer;

        validators.find(validator => {
            changer = validator(node);
            return Boolean(changer);
        });

        return changer;
    };
}

// Convert an old rule definition to an individual plugin with on "validateNode"
function toValidateNode(rule: Rule): Validator {
    return function validateRule(node: Node) {
        if (!rule.match(node)) {
            return undefined;
        }

        const validationResult = rule.validate(node);

        if (validationResult == null) {
            return undefined;
        }

        return change => rule.normalize(change, node, validationResult);
    };
}

/**
 * A rule that ensures table node has all align data
 */
function tableContainAlignData(opts: Options): Rule {
    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const presetAlign = table.data.get('presetAlign', []);
            const row = table.nodes.first();
            const columns = row.nodes.size;

            return presetAlign.length == columns
                ? null
                : { presetAlign, columns };
        },

        /**
         * Updates by key the table to add the data
         */
        normalize(
            change,
            node,
            { presetAlign, columns }: { presetAlign: string[], columns: number }
        ) {
            return change.setNodeByKey(
                node.key,
                {
                    data: node.data.set(
                        'presetAlign',
                        createAlign(columns, presetAlign)
                    )
                },
                { normalize: false }
            );
        }
    };
}

export default validateNode;
