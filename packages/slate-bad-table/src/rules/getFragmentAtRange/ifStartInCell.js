// @flow
import { type typeRule } from './type';
import type Options from '../../options';

function ifStartInCell(opts: Options): typeRule {
    return (rootGetFragment, node, range, getOpts, next) => {
        const { startKey, endKey } = range;
        const cell = node.getClosest(
            startKey,
            x => x.type === opts.typeBadCell
        );
        if (!cell) {
            return next(getOpts);
        }
        if (cell.hasDescendant(endKey)) {
            return next(getOpts);
        }
        const nextBlock = node.getNextBlock(cell.key);
        if (!nextBlock) {
            return rootGetFragment(cell, range.moveFocusToEndOf(cell), getOpts);
        }
        const badCellFragment = rootGetFragment(
            node,
            range.moveFocusToEndOf(cell),
            getOpts
        );
        const nextBlockFragment = rootGetFragment(
            node,
            range.moveAnchorToStartOf(nextBlock),
            getOpts
        );
        return badCellFragment.set(
            'nodes',
            badCellFragment.nodes.concat(nextBlockFragment.nodes)
        );
    };
}
export default ifStartInCell;
