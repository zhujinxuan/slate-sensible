// @flow
import { type Node } from 'slate';

function isEndByKey(node: Node, key: string): boolean {
    if (node.object === 'text') return node.key === key;
    const lastValid = node.nodes.findLast(
        n => n.text.length > 0 || n.object !== 'text' || n.key === key
    );
    if (!lastValid) return false;
    if (lastValid.key === key) return true;
    if (lastValid.object === 'text') return false;
    return isEndByKey(lastValid, key);
}
export default isEndByKey;
