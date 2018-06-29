// @flow
import { type Change, type Node, type Range, Block } from 'slate';
import { List } from 'immutable';
import type Options from '../options';

function convertEditTable2BadTable(
    opts: Options,
    change: Change,
    table: Node,
    range: Range
): Change {
    if (table.type !== opts.typeTable) {
        return change;
    }
    table.nodes.forEach(row => {
        row.nodes.forEach(cell => {
            const paragraph = Block.create({
                type: opts.typeBadCell,
                nodes: cell.nodes
            });
            const nextCell = cell.merge({
                type: opts.typeBadCell,
                nodes: List(paragraph)
            });
            change.replaceNodeByKey(nextCell.key, nextCell, {
                normalize: false
            });

            const cellPath = change.value.document.getPath(cell.key);
            cell = change.value.document.getDescendantAtPath(cellPath);
            let textToCheck = cell.getFirstText();

            while (textToCheck) {
                const matched = textToCheck.text.match(/\n/);
                if (!matched) {
                    textToCheck = cell.getNextText(textToCheck.key);
                }

                const charIndex = matched.index;
                const furthestAncestor = cell.getFurthestAncestor(
                    textToCheck.key
                );

                change.removeTextByKey(textToCheck.key, charIndex, 1, {
                    normalize: false
                });
                change.splitDescendantsByKey(
                    furthestAncestor.key,
                    textToCheck.key,
                    charIndex,
                    { normalize: false }
                );

                cell = change.value.document.getDescendantAtPath(cellPath);
                const {
                    focusKey,
                    focusOffset,
                    anchorKey,
                    anchorOffset
                } = range;
                const lastKey = textToCheck.key;
                textToCheck = cell.getNextText(textToCheck.key);

                if (focusKey === lastKey && focusOffset > charIndex) {
                    range = range.moveFocusTo(
                        textToCheck.key,
                        focusOffset - charIndex - 1
                    );
                }

                if (anchorKey === lastKey && anchorOffset > charIndex) {
                    range = range.moveAnchorTo(
                        textToCheck.key,
                        anchorOffset - charIndex - 1
                    );
                }
            }
        });
        change.setNodeByKey(row.key, opts.typeBadRow, { normalize: false });
        return true;
    });
    change.setNodeByKey(table.key, opts.typeBadRow, {
        normalize: false
    });
    return range;
}
export default convertEditTable2BadTable;
