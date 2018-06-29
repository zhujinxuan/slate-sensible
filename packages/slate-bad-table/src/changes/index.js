// @flow
import { type Change } from 'slate';
import type Options from '../options';
import removeTable from './removeTable';
import insertColumn from './insertColumn';
import insertRow from './insertRow';
import removeColumn from './removeColumn';
import removeRow from './removeRow';

type typeRemoveOptions = {
    snapshot: boolean
};
type typeRemoveFunction = (Change, typeRemoveOptions) => Change;

type typeChanges = {
    insertColumn: Change => Change,
    insertRow: Change => Change,
    removeRow: typeRemoveFunction,
    removeColumn: typeRemoveFunction,
    removeTable: typeRemoveFunction
};

function makeChanges(opts: Options): typeChanges {
    return {
        removeTable: removeTable(opts),
        removeColumn: removeColumn(opts),
        removeRow: removeRow(opts),
        insertRow: insertRow(opts),
        insertColumn: insertColumn(opts)
    };
}

export default makeChanges;
