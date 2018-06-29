// @flow
import { type Node } from 'slate';

function getLastBlock(node: ?Node): ?Node {
    if (!node) return node;
    if (node.isLeafBlock()) {
        return node;
    }
    if (node.object !== 'block') {
        return null;
    }
    let found = null;
    node.nodes.findLast(child => {
        if (child.object !== 'block') return false;
        found = getLastBlock(child);
        return found;
    });
    return found;
}
export default getLastBlock;
