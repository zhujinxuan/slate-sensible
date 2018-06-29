// @flow
import { type typeRule } from './type';
import type Options from '../../options';

function ifEndInCell(opts: Options): typeRule {
    return (rootGetFragment, node, range, getOpts, next) => {
        const { startKey, endKey } = range;
        const cell = node.getClosest(endKey, x => x.type === opts.typeBadCell);

        if (!cell) {
            return next(getOpts);
        }
        if (cell.getDescendant(startKey)) {
            return next(getOpts);
        }
        const prevBlock = node.getPreviousBlock(cell.key);
        if (!prevBlock) {
            return rootGetFragment(
                cell,
                range.moveAnchorToStartOf(cell),
                getOpts
            );
        }
        const prevFragment = rootGetFragment(
            node,
            range.moveFocusToEndOf(prevBlock),
            getOpts
        );
        const badCellFragment = rootGetFragment(
            node,
            range.moveAnchorToStartOf(cell),
            getOpts
        );
        return prevFragment.set(
            'nodes',
            prevFragment.nodes.concat(badCellFragment.nodes)
        );
    };
}

export default ifEndInCell;
