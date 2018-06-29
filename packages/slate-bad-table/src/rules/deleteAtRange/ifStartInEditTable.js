// @flow
import type Options from '../../options';
import { type typeRule } from './type';

function ifStartInEditCell(opts: Options): typeRule {
    return (rootDelete, change, range, removeOptions, next) => {
        const { document } = change.value;
        const { startKey, endKey } = range;

        const cell = document.getClosestBlock(startKey);
        if (!cell || cell.type !== opts.typeCell) {
            return next(removeOptions);
        }
        const ancestors = document.getAncestors(startKey);
        const cellAncestorIndex = ancestors.indexOf(cell);

        const table = ancestors.get(cellAncestorIndex - 2);
        if (table.hasDescendant(endKey)) {
            return next(removeOptions);
        }

        rootDelete(
            change,
            range.moveFocusToEndOf(table),
            removeOptions.set('deleteEndText', true)
        );

        const nextBlock = document.getNextBlock(table.key);
        if (nextBlock) {
            rootDelete(
                change,
                range.moveAnchorToStartOf(nextBlock),
                removeOptions.set('deleteStartText', true)
            );
        }
        return change;
    };
}

export default ifStartInEditCell;
