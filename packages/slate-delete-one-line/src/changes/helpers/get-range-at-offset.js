// @flow
import { Range, type Block } from 'slate';
import getKeyAndOffsetAtOffset from '../../utils/get-key-and-offset-at-offset';

export default function getRangeAtOffset(block: Block, index: number): Range {
    const { key, offset } = getKeyAndOffsetAtOffset(block, index);
    return Range.create({
        anchorKey: key,
        focusKey: key,
        anchorOffset: offset,
        focusOffset: offset
    });
}
