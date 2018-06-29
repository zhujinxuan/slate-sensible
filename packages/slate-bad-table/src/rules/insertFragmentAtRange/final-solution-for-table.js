// @flow
import type Options from '../../options';
import { type typeRule } from './type';

function finalSolutionToJumpOutOfATable(opts: Options): typeRule {
    return (rootInsert, change, range, fragment, insertOptions, next) => {
        const { document } = change.value;
        const { startKey, endKey } = range;
        const startBlock = document.getClosestBlock(startKey);
        if (startBlock.type !== opts.typeCell) return next(insertOptions);
        const endBlock = document.getClosestBlock(endKey);
        if (endBlock.type !== opts.typeCell) {
            return rootInsert(
                change,
                range.collapseToEnd(),
                fragment,
                insertOptions
            );
        }

        const table = document.getAncestors(startBlock.key).get(-2);
        const indexFix = table.nodes.first().getDescendant(startKey) ? 0 : 1;

        const parent = document.getParent(table.key);
        const index = parent.nodes.indexOf(table) + indexFix;
        fragment.nodes.forEach((n, ii) =>
            change.insertNodeByKey(parent.key, index + ii, n, {
                normalize: false
            })
        );
        return change;
    };
}
export default finalSolutionToJumpOutOfATable;
