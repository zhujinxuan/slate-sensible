// @flow

import { Record, type RecordOf } from 'immutable';

export type OptionsFormat = {
    typeTable?: string,
    typeRow?: string,
    typeCell?: string,
    typeBadTable?: string,
    typeBadRow?: string,
    typeBadCell?: string,
    typeParagraph?: string,
    allowSoftBreak?: boolean
};

export type Options = RecordOf<{
    typeTable: string,
    typeRow: string,
    typeCell: string,
    typeBadTable: string,
    typeBadCell: string,
    typeBadRow: string,
    typeParagraph: string,
    allowSoftBreak: boolean
}>;

const defaultOptions: Options = Record({
    typeTable: 'table',
    typeRow: 'table_row',
    typeCell: 'table_cell',
    typeBadTable: 'bad-table',
    typeBadRow: 'bad-table-row',
    typeBadCell: 'bad-table-cell',
    typeParagraph: 'paragraph',
    allowSoftBreak: true
})();

export default defaultOptions;
