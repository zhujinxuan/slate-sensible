// @flow

import { Block } from 'slate';
import { List } from 'immutable';
import type Options from '../../options';
import makeEmptyCell from './make-empty-cell';

export default function makeEmptyRow(opts: Options): Block {
    return Block.create({
        type: opts.typeRow,
        nodes: List([makeEmptyCell(opts)])
    });
}
