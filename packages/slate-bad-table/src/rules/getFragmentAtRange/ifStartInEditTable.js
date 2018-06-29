// @flow
import { Block, Text } from 'slate';
import { type typeRule } from './type';
import type Options from '../../options';

function ifStartInCell(opts: Options): typeRule {
    return (rootGetFragment, node, range, getOpts, next) => {
        const { startKey, endKey, startOffset } = range;
        const cell = node.getClosestBlock(startKey);
        if (!cell || cell.type !== opts.typeCell) {
            return next(getOpts);
        }
        if (cell.getDescendant(endKey)) {
            return next(getOpts);
        }

        const row = node.getParent(cell.key);
        if (cell === row.nodes.first()) {
            return next(getOpts);
        }

        const cellIndex = row.nodes.indexOf(cell);
        const newRow = row.set(
            'nodes',
            row.nodes.map((beforeCell, beforeCellIndex) => {
                if (beforeCellIndex > cellIndex) {
                    return beforeCell;
                }
                if (beforeCellIndex < cellIndex) {
                    return Block.create({
                        type: opts.typeCell,
                        nodes: [Text.create('')]
                    });
                }
                let newCell;
                let child = node.getDescendant(startKey);
                child = child.removeText(0, startOffset);
                const ancestors = node.getAncestors(startKey);

                ancestors.findLast(parent => {
                    const childIndex = parent.nodes.findIndex(
                        n => n.key === child.key
                    );
                    parent = parent.set(
                        'nodes',
                        parent.nodes.set(childIndex, child).skip(childIndex)
                    );

                    if (parent.key !== cell.key) {
                        child = parent;
                        return false;
                    }
                    newCell = parent;
                    return true;
                });
                return newCell;
            })
        );
        return rootGetFragment(
            node.updateNode(newRow),
            range.moveAnchorToStartOf(newRow),
            getOpts
        );
    };
}
export default ifStartInCell;
