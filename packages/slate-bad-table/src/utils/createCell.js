// @flow
import { Block, Text } from 'slate';
import { List } from 'immutable';
import type BadTablePosition from './BadTablePosition';

function createCell(position: BadTablePosition): Block {
    const { opts } = position;
    return Block.create({
        type: opts.typeBadCell,
        nodes: List.of(
            Block.create({
                type: opts.typeParagraph,
                nodes: List.of(Text.create(''))
            })
        )
    });
}
export default createCell;
