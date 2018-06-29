// @flow
import { type Node } from 'slate';

function getLastBlock(node: Node): Node | void {
    if (node.isLeafBlock()) {
        return node;
    }
    if (node.object !== 'block') {
        return null;
    }
    let found = null;
    node.nodes.findLast(child => {
        if (child.object !== 'block') return false;
        found = getLastBlock(found);
        return found;
    });
    return found;
}
export default getLastBlock;
