// @flow
import { type Node } from 'slate';

function pasteSingleRow(
    row: Node,
    fragmentRow: Node,
    begin: number,
    end: number,
    preferEnd: boolean = false
): Node {
    while (end < 0) {
        end = row.nodes.size + end;
    }
    return row.set(
        'nodes',
        row.nodes.map((cell, index) => {
            if (index < begin) return cell;
            if (index > end) return cell;
            const pasteCell = fragmentRow.nodes.get(index);
            if (!pasteCell) return cell;
            if (preferEnd && begin === index && begin === end)
                return cell.set('nodes', pasteCell.nodes.concat(cell.nodes));
            if (index === begin)
                return cell.set('nodes', cell.nodes.concat(pasteCell.nodes));
            return cell.set('nodes', pasteCell.nodes.concat(cell.nodes));
        })
    );
}
export default pasteSingleRow;
