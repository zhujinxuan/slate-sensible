// @flow
import { type Node } from 'slate';

function isStartByKey(node: Node, key: string): boolean {
    if (node.object === 'text') return node.key === key;
    const firstValid = node.nodes.find(
        n => n.text.length > 0 || n.object !== 'text' || n.key === key
    );
    if (!firstValid) return false;
    if (firstValid.key === key) return true;
    if (firstValid.object === 'text') return false;
    return isStartByKey(firstValid, key);
}

export default isStartByKey;
