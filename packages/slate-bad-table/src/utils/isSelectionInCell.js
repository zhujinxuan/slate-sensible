// @flow
import { type Value } from 'slate';
import type Options from '../options';

function isSelectionInCell(opts: Options): Value => boolean {
    return value => {
        const { startKey, endKey } = value.selection;
        const { document } = value;
        const { typeBadCell } = opts;
        const startCell = document.getClosest(
            startKey,
            cell => cell.type === typeBadCell
        );
        const endCell = document.getClosest(
            endKey,
            cell => cell.type === typeBadCell
        );
        return !!(startCell === endCell && startCell);
    };
}

export default isSelectionInCell;
