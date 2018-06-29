// @flow
import { type Node } from 'slate';

function getFirstBlock(node: ?Node): ?Node {
    if (!node) return node;

    if (node.isLeafBlock()) {
        return node;
    }

    if (node.object !== 'block') {
        return null;
    }

    let found = null;

    node.nodes.find(child => {
        if (child.object !== 'block') return false;
        found = getFirstBlock(child);
        return found;
    });
    return found;
}

export default getFirstBlock;
