// @flow
import { type Node } from 'slate';
import type Options from '../../options';
import getFirstBlock from './getFirstBlock';
import getLastBlock from './getLastBlock';

function isTextBlock(opts: Options, node: Node) {
    if (node.object !== 'block') {
        return true;
    }
    if (node.type === opts.typeParagraph) {
        return true;
    }
    if (node.type === opts.typeTable) {
        return false;
    }
    if (node.type === opts.typeBadTable) {
        return false;
    }
    return getFirstBlock(node) === getLastBlock(node);
}
export default isTextBlock;
