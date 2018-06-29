// @flow
import { type Change, Block, Text } from 'slate';
import type Options from '../options';

type typeRemoveOptions = {
    snapshot: boolean
};
function removeTable(opts: Options): (Change, typeRemoveOptions) => Change {
    return (change, removeOptions = { snapshot: true }) => {
        const { value } = change;
        const { document } = value;
        const { focusKey } = value.selection;
        const { typeBadTable } = opts;
        const table = document.getClosest(
            focusKey,
            cell => cell && cell.type === typeBadTable
        );
        if (!table || table.type !== typeBadTable) {
            return change;
        }
        if (removeOptions.snapshot) {
            change.snapshotSelection();
        }

        const nextBlock = document.getNextBlock(table.key);
        if (nextBlock) {
            change.removeNodeByKey(table.key).collapseToStartOf(nextBlock);
            return change;
        }

        const prevBlock = document.getPreviousBlock(table.key);
        if (prevBlock) {
            change.removeNodeByKey(table.key).collapseToEndOf(prevBlock);
            return change;
        }

        const nextFocusBlock = Block.create({
            type: opts.typeParagraph,
            nodes: [Text.create('')]
        });
        const tableParent = document.getParent(table.key);
        const insertionIndex = tableParent.nodes.indexOf(table) + 1;
        change.insertNodeByKey(tableParent.key, insertionIndex, nextFocusBlock);
        change.collapseToStartOf(nextFocusBlock);

        return change.removeNodeByKey(table.key);
    };
}

export default removeTable;
