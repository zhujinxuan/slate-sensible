// @flow
import { type Change } from 'slate';
import type Options from '../options';
import BadTablePosition from '../utils/BadTablePosition';
import createRow from '../utils/createRow';

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
        const rowIndex = position.getRowIndex();
        const nextRow = createRow(position);

        change.insertNodeByKey(position.badTable.key, rowIndex + 1, nextRow);
        return change;
    };
}

export default insertColumn;
