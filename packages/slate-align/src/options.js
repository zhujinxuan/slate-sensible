// @flow

import { Record } from 'immutable';

export type typeOptions = {
    floatBlocks?: Array<string>,
    textBlocks?: Array<string>
};
const defaultOption: typeOptions = {
    floatBlocks: ['table', 'bad-table', 'image'],
    textBlocks: ['paragraph', 'heading', 'table_cell', 'bad-table-cell']
};
class Options extends Record(defaultOption) {
    floatBlocks: Array<string>;
    textBlocks: Array<string>;
}

export default Options;
