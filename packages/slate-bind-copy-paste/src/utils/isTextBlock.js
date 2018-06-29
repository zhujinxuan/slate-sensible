// @flow
import { type Node } from 'slate';
import getFirstBlock from './getFirstBlock';
import getLastBlock from './getLastBlock';

function isTextBlock(node: Node): boolean {
    if (node.object !== 'block') {
        return false;
    }

    const firstBlock = getFirstBlock(node);
    return !!(
        firstBlock &&
        firstBlock === getLastBlock(node) &&
        !firstBlock.isVoid
    );
}

export default isTextBlock;
