// @flow
import { type Change, type Node } from 'slate';
import type Options from '../../../options';
import moveNodesToParent from '../utils/moveNodesToParent';

function normalize(
    opts: Options,
    change: Change,
    reason: string,
    context: Object
): void {
    if (reason === 'parent_object_invalid') {
        const { node, parent }: { node: Node, parent: Node } = context;
        moveNodesToParent(change, node, parent);
    }

    if (reason === 'child_required') {
        const { node } = context;
        const parent = change.value.document.getParent(node.key);
        moveNodesToParent(change, node, parent);
    }

    if (reason === 'child_object_invalid' || reason === 'child_type_invalid') {
        const { child } = context;
        change.unwrapNodeByKey(child.key, { normalize: false });
    }
}
export default normalize;
