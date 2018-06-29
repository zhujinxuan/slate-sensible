// @flow
import { type Change } from 'slate';
import type Options from '../options';
import BadTablePosition from '../utils/BadTablePosition';
import createCell from '../utils/createCell';

function insertColumn(opts: Options): Change => Change {
    return change => {
        const { value } = change;
        const { document } = value;
        const { focusKey } = value.selection;
        const { typeBadCell } = value.typeBadTable;
        const badCell = document.getClosest(
            focusKey,
            cell => cell && cell.type === typeBadCell
        );
        if (!badCell || badCell.type !== typeBadCell) {
            return change;
        }

        const position = BadTablePosition.create(opts, document, badCell);
        const columnIndex = position.getColumnIndex();
        position.badTable.nodes.forEach(row => {
            const nextCell = createCell(position);
            change.insertNodeByKey(row.key, columnIndex + 1, nextCell);
        });
        return change;
    };
}

export default insertColumn;
