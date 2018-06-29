// @flow

import { type Change } from 'slate';
import type Options from '../../options';
import cellNormalizer from './cell/index';
import rowNormalizer from './row/index';
import tableNormalizer from './table/index';

type typeNormalizers = {
    cell: (Change, string, Object) => void,
    row: (Change, string, Object) => void,
    table: (Change, string, Object) => void
};
function createNormalizer(opts: Options): typeNormalizers {
    return {
        cell: (change, reason, context) =>
            cellNormalizer(opts, change, reason, context),
        row: (change, reason, context) =>
            rowNormalizer(opts, change, reason, context),
        table: (change, reason, context) =>
            tableNormalizer(opts, change, reason, context)
    };
}

export default createNormalizer;
