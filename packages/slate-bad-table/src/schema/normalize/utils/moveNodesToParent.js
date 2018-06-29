// @flow
import { type Change, type Node } from 'slate';

function moveNodesToParent(change: Change, node: Node, parent: Node): void {
    const nodeIndex = parent.nodes.indexOf(node);
    node.nodes.forEach((block, index) => {
        change.moveNodeByKey(block.key, parent.key, nodeIndex + index, {
            normalize: false
        });
        return index;
    });
    change.removeNodeByKey(node.key, { normalize: false });
}
export default moveNodesToParent;
