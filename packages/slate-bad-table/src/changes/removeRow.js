// @flow
import { type Change } from 'slate';
import type Options from '../options';
import removeTable from './removeTable';
import BadTablePosition from '../utils/BadTablePosition';

type typeRemoveOptions = {
    snapshot: boolean
};
function removeRow(opts: Options): (Change, typeRemoveOptions) => Change {
    return (change, removeOptions = { snapshot: true }) => {
        const { value } = change;
        const { document } = value;
        const { focusKey } = value.selection;
        const { typeBadCell } = opts;
        const badCell = document.getClosest(
            focusKey,
            cell => cell && cell.type === typeBadCell
        );
        if (!badCell || badCell.type !== typeBadCell) {
            return change;
        }

        const position = BadTablePosition.create(opts, document, badCell);
        if (position.getHeight() === 1) {
            return removeTable(opts)(change, removeOptions);
        }
        if (removeOptions.snapshot) {
            change.snapshotSelection();
        }

        const nextBlock = document.getNextBlock(position.badRow.key);
        if (nextBlock) {
            change.collapseToStartOf(nextBlock);
        } else {
            const prevBlock = document.getPrevBlock(position.badRow.key);
            if (prevBlock) {
                change.collapseToEndOf(prevBlock);
            }
        }
        change.removeNodeByKey(position.badRow.key);
        return change;
    };
}

export default removeRow;
