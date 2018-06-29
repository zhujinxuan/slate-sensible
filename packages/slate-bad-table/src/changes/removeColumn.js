// @flow
import { type Change } from 'slate';
import type Options from '../options';
import removeTable from './removeTable';
import BadTablePosition from '../utils/BadTablePosition';

type typeRemoveOptions = {
    snapshot: boolean
};
function removeColumn(opts: Options): (Change, typeRemoveOptions) => Change {
    return (change, removeOptions = { snapshot: true, normalize: true }) => {
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
        if (position.getWidth() === 1) {
            return removeTable(opts)(change, removeOptions);
        }
        if (removeOptions.snapshot) {
            change.snapshotSelection();
        }

        const nextBlock = document.getNextBlock(position.badCell.key);
        if (nextBlock) {
            change.collapseToStartOf(nextBlock);
        } else {
            const prevBlock = document.getPreviousBlock(position.badCell.key);
            if (prevBlock) {
                change.collapseToEndOf(prevBlock);
            }
        }
        const columnIndex = position.getColumnIndex();
        position.badTable.nodes.forEach(row => {
            change.removeNodeByKey(row.nodes.get(columnIndex).key, {
                normalize: false
            });
        });
        if (removeOptions.normalize) {
            change.normalizeNodeByKey(position.badTable.key);
        }
        return change;
    };
}
export default removeColumn;
