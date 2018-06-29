// @flow
import { type Node, type Change } from 'slate';
import type Options from '../../../options';
import moveNodesToParent from '../utils/moveNodesToParent';

function normalize(
    opts: Options,
    change: Change,
    reason: string,
    context: Object
): void {
    if (
        reason === 'parent_type_invalid' ||
        reason === 'parent_object_invalid'
    ) {
        const { node, parent }: { node: Node, parent: Node } = context;
        moveNodesToParent(change, node, parent);
    }

    if (reason === 'child_required') {
        const { node }: { node: Node } = context;
        if (node.nodes.size === 0) {
            change.removeNodeByKey(node.key, { normalize: false });
            return;
        }
        const parent: Node = change.value.document.getParent(node.key);
        moveNodesToParent(change, node, parent);
    }

    if (reason === 'child_object_invalid' || reason === 'child_type_invalid') {
        const { child } = context;
        change.unwrapNodeByKey(child.key, { normalize: false });
    }
}
export default normalize;
