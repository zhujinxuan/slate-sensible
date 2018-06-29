// @flow
import type Options from '../../options';
import { type typeRule } from './type';

function ifInSameCell(opts: Options): typeRule {
    return (rootDelete, change, range, removeOptions, next) => {
        const { startKey, endKey } = range;
        const { document } = change.value;
        const startCell = document.getClosest(
            startKey,
            x => x.type === opts.typeBadCell
        );
        if (!startCell || !startCell.getDescendant(endKey)) {
            return next(removeOptions);
        }
        if (!range.collapseToStart().isAtStartOf(startCell)) {
            return next(removeOptions);
        }
        if (!range.collapseToEnd().isAtEndOf(startCell)) {
            return next(removeOptions);
        }
        const { deleteStartText, deleteEndText } = removeOptions;
        if (deleteStartText && deleteEndText) {
            change.removeNodeByKey(startCell.key, { normalize: false });
            return change;
        }
        return next(removeOptions);
    };
}
export default ifInSameCell;
