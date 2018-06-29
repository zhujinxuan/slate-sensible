// @flow
import { type Change, type Node } from 'slate';
import type Options from '../options';

import transformToNormalTable from './transformToNormalTable';

function createValidateNode(opts: Options): Node => (Change => Change) | void {
    return node => transformToNormalTable(opts, node);
}
export default createValidateNode;
