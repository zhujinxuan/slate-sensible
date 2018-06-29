// @flow
import { type Change } from 'slate';
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
    if (reason === 'child_object_invalid') {
        const { child } = context;
        if (child.object === 'text' || child.object === 'inline') {
            change.wrapBlockByKey(child.key, opts.typeParagraph, {
                normalize: false
            });
        } else {
            change.unwrapNodeByKey(child.key, { normalize: false });
        }
    }
    if (reason === 'child_type_invalid') {
        const { child } = context;
        change.unwrapNodeByKey(child.key, { normalize: false });
    }

    if (reason === 'child_required') {
        const { node } = context;
        const parent = change.value.document.getParent(node.key);
        moveNodesToParent(change, node, parent);
    }
}
export default normalize;
