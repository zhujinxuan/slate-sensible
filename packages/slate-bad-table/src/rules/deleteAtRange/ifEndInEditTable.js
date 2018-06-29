// @flow
import type Options from '../../options';
import { type typeRule } from './type';

function ifEndInEditTable(opts: Options): typeRule {
    return (rootDelete, change, range, removeOptions, next) => {
        const { document } = change.value;
        const { startKey, endKey } = range;

        const cell = document.getClosestBlock(endKey);
        if (!cell || cell.type !== opts.typeCell) {
            return next(removeOptions);
        }
        const ancestors = document.getAncestors(endKey);
        const cellAncestorIndex = ancestors.indexOf(cell);

        const table = ancestors.get(cellAncestorIndex - 2);

        if (table.hasDescendant(startKey)) {
            return next(removeOptions);
        }

        const prevBlock = document.getPreviousBlock(table.key);
        if (prevBlock) {
            rootDelete(
                change,
                range.moveFocusToEndOf(prevBlock),
                removeOptions.set('deleteEndText', true)
            );
        }

        return rootDelete(
            change,
            range.moveAnchorToStartOf(table),
            removeOptions.set('deleteStartText', true)
        );
    };
}

export default ifEndInEditTable;
