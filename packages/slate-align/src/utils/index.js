// @flow
import { type Range, type Node } from 'slate';
import getAlignBlocksAtRange, {
    getAlignBlocksInBlock
} from './getAlignBlocksAtRange';
import type Options from '../options';

function createUtils(opts: Options) {
    return {
        getAlignBlocksAtRange: (range: Range, node: Node): Array<Node> =>
            getAlignBlocksAtRange(opts, range, node),
        getAlignBlocksInBlock: (node: Node): Array<Node> =>
            getAlignBlocksInBlock(opts, node)
    };
}
export default createUtils;
