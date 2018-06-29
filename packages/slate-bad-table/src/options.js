// @flow

import { Record } from 'immutable';

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

/**
 * The plugin options
 */
class Options extends Record({
    typeTable: 'table',
    typeRow: 'table_row',
    typeCell: 'table_cell',
    typeBadTable: 'bad-table',
    typeBadRow: 'bad-table-row',
    typeBadCell: 'bad-table-cell',
    typeParagraph: 'paragraph',
    allowSoftBreak: true
}) {
    // The type of table blocks
    typeTable: string;
    // The type of row blocks
    typeRow: string;
    // The type of cell blocks
    typeCell: string;

    // Bad Table
    typeBadTable: string;
    typeBadCell: string;
    typeBadRow: string;

    //
    typeParagraph: string;
    //
    allowSoftBreak: boolean;
}

export default Options;
