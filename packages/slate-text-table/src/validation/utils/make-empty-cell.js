// @flow

import { Block, Text } from 'slate';
import { List } from 'immutable';
import type Options from '../../options';

export default function makeEmptyCell(opts: Options): Block {
    return Block.create({
        type: opts.typeCell,
        nodes: List([Text.create('')])
    });
}
