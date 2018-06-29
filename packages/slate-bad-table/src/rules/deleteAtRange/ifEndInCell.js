// @flow
import { type typeRule } from './type';
import type Options from '../../options';

function ifEndInCell(opts: Options): typeRule {
    return (rootDelete, change, range, removeOptions, next) => {
        const { document } = change.value;
        const { startKey, endKey } = range;
        const cell = document.getClosest(
            endKey,
            x => x.type === opts.typeBadCell
        );
        if (!cell) {
            return next(removeOptions);
        }
        if (cell.hasDescendant(startKey)) {
            return next(removeOptions);
        }
        const prevBlock = document.getPreviousBlock(cell.key);
        if (prevBlock) {
            rootDelete(
                change,
                range.moveFocusToEndOf(prevBlock),
                removeOptions.set('deleteEndText', true)
            );
        }
        return rootDelete(
            change,
            range.moveAnchorToStartOf(cell),
            removeOptions.set('deleteStartText', true)
        );
    };
}

export default ifEndInCell;
