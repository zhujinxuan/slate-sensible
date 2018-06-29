// @flow
import type Options from '../../options';
import { type typeRule } from './type';

function insertUnknownInDifferentCells(opts: Options): typeRule {
    return (rootInsert, change, range, fragment, insertOptions, next) => {
        if (fragment.nodes.size === 0) {
            return next(insertOptions);
        }
        const { document } = change.value;
        const { startKey, endKey } = range;
        const startCell = document.getClosestBlock(startKey);
        const endCell = document.getClosestBlock(endKey);

        if (startCell === endCell) {
            return next(insertOptions);
        }

        if (
            startCell.type !== opts.typeCell &&
            endCell.type !== opts.typeCell
        ) {
            return next(insertOptions);
        }
        return rootInsert(
            change,
            range.collapseToStart(),
            fragment,
            insertOptions
        );
    };
}
export default insertUnknownInDifferentCells;
