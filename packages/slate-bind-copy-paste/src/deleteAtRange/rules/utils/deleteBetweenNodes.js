// @flow
import { type Change } from 'slate';
import isStartByKey from './isStartByKey';
import isEndByKey from './isEndByKey';

function deleteBetweenNodes(
    change: Change,
    startKey: string,
    endKey: string
): Change {
    const { document } = change.value;
    const startText = document.getDescendant(startKey);
    if (startText.object !== 'text')
        return deleteBetweenNodes(change, startText.getFirstText().key, endKey);
    const endText = document.getDescendant(endKey);
    if (endText.object !== 'text')
        return deleteBetweenNodes(change, startKey, endText.getLastText().key);

    if (startKey === endKey) {
        const lonely = document.getFurthestOnlyChildAncestor(startKey);
        let removalNode = lonely || startText;
        if (removalNode.object === 'document') {
            removalNode = removalNode.getFurthestAncestor(startKey);
        }
        return change.removeNodeByKey(removalNode.key, { normalize: false });
    }

    if (!document.areDescendantsSorted(startKey, endKey)) {
        return deleteBetweenNodes(change, endKey, startKey);
    }

    const commonAncestor = document.getCommonAncestor(startKey, endKey);
    if (
        isStartByKey(commonAncestor, startKey) &&
        isEndByKey(commonAncestor, endKey)
    ) {
        if (commonAncestor.object === 'document') {
            document.nodes.forEach(n =>
                change.removeNodeByKey(n.key, { normalize: false })
            );
            return change;
        }
        return change.removeNodeByKey(commonAncestor.key, { normalize: false });
    }

    let startNode = startText;
    commonAncestor.getAncestors(startKey).findLast(n => {
        if (!isStartByKey(n, startNode.key)) {
            return true;
        }
        if (n.getDescendant(endKey)) {
            return true;
        }
        startNode = n;
        return false;
    });
    let endNode = endText;
    commonAncestor.getAncestors(endKey).findLast(n => {
        if (!isEndByKey(n, endKey)) {
            return true;
        }
        if (n.getDescendant(startKey)) {
            return true;
        }
        endNode = n;
        return false;
    });

    const startAncestors = commonAncestor.getAncestors(startNode.key);
    // Delete Nodes at the start
    change.removeNodeByKey(startNode.key, { normalize: false });
    startAncestors.findLast((n, index) => {
        if (index === 0) return true;
        const child =
            index + 1 < startAncestors.size
                ? startAncestors.get(index + 1)
                : startNode;
        n.nodes
            .skip(n.nodes.indexOf(child) + 1)
            .forEach(c => change.removeNodeByKey(c.key, { normalize: false }));
        return false;
    });
    // Delete Nodes in middle
    const startChild = commonAncestor.getFurthestAncestor(startKey);
    const endChild = commonAncestor.getFurthestAncestor(endKey);
    const middleNodes = commonAncestor.nodes.slice(
        commonAncestor.nodes.indexOf(startChild) + 1,
        commonAncestor.nodes.indexOf(endChild)
    );
    middleNodes.forEach(c =>
        change.removeNodeByKey(c.key, { normalize: false })
    );

    // Delete Nodes at the end
    const endAncestors = commonAncestor.getAncestors(endNode.key);
    endAncestors.forEach((n, index) => {
        if (index === 0) return;
        const child =
            index + 1 < endAncestors.size
                ? endAncestors.get(index + 1)
                : endNode;
        n.nodes
            .take(n.nodes.indexOf(child))
            .forEach(c => change.removeNodeByKey(c.key, { normalize: false }));
    });
    change.removeNodeByKey(endNode.key, { normalize: false });
    return change;
}
export default deleteBetweenNodes;
