// @flow
import { type typeRule } from './type';
import type Options from '../../options';

function isInSameCell(opts: Options): typeRule {
    return (rootGetFragment, node, range, getOpts, next) => {
        const { startKey, endKey } = range;
        const cell = node.getClosest(
            startKey,
            x => x.type === opts.typeBadCell
        );

        if (!cell || !cell.getDescendant(endKey)) {
            return next(getOpts);
        }
        if (cell === node) {
            return next(getOpts);
        }
        return rootGetFragment(cell, range, getOpts);
    };
}
export default isInSameCell;
