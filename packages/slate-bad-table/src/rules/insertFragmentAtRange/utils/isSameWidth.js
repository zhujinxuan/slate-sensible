// @flow
import { type Node } from 'slate';

function isSameWidth(table: Node, fragmentTable: Node): boolean {
    if (table.nodes.size === 0) return false;
    const rowSize = table.nodes.first().nodes.size;
    const invalid = fragmentTable.nodes.find(r => r.nodes.size !== rowSize);
    return !invalid;
}
export default isSameWidth;
