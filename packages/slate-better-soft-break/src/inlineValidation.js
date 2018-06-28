// @flow
import { type Node, type Change } from 'slate';

function inlineValidation(node: Node): void | (Change => Change) {
    if (node.object !== 'inline') return undefined;
    if (node.text.indexOf('\n') === -1) return undefined;
    if (node.isVoid) return undefined;
    return change => {
        let block = change.value.document.getClosestBlock(node.key);
        const blockPath = change.value.document.getPath(block.key);
        if (block.isVoid) {
            node.getTexts().forEach(t => {
                if (t.text.indexOf('\n') === -1) return;
                change.removeTextByKey(t.key, t.text.indexOf('\n'), 1, {
                    normalize: false
                });
            });
            return change;
        }
        node.getTexts().forEach(t => {
            if (t.text.indexOf('\n') === -1) return;
            block = change.value.document.refindNode(blockPath, block.key);
            const startChild = block.getFurthestAncestor(t.key);
            const childIndex = block.nodes.indexOf(startChild);
            if (t.text === '\n') {
                change.moveNodeByKey(t.key, block.key, childIndex, {
                    normalize: false
                });
                change.removeNodeByKey(startChild.key);
                return;
            }

            const splitOffset = t.text.indexOf('\n');
            if (splitOffset === 0) {
                change.splitDescendantsByKey(startChild.key, t.key, 1, {
                    normalize: false
                });
                change.moveNodeByKey(t.key, block.key, childIndex, {
                    normalize: false
                });
                change.removeNodeByKey(startChild.key);
                return;
            }

            if (splitOffset !== t.text.length - 1) {
                change.splitDescendantsByKey(
                    startChild.key,
                    t.key,
                    splitOffset + 1,
                    { normalize: false }
                );
            }
            change.splitDescendantsByKey(startChild.key, t.key, splitOffset, {
                normalize: false
            });
            block = change.value.document.refindNode(blockPath, block.key);
            const removalKey = block.nodes.get(childIndex + 1).key;
            t = block.nodes.get(childIndex + 1).getFirstText();
            change.moveNodeByKey(t.key, block.key, childIndex + 1, {
                normalize: false
            });
            change.removeNodeByKey(removalKey, { normalize: false });
        });
        return change;
    };
}
export default inlineValidation;
