// @flow
import { Record } from 'immutable';
import { Block, type Document } from 'slate';
import Options from '../options';

class BadTablePosition extends Record({
    badTable: null,
    badRow: null,
    badCell: null
}) {
    badTable: Block;
    badRow: Block;
    badCell: Block;
    opts: Options;

    static create(
        opts: Options,
        document: Document,
        badCell: Block
    ): BadTablePosition {
        const ancestors = document.getAncestors(badCell.key);
        const badRow = ancestors.get(-1);
        const badTable = ancestors.get(-2);

        return new BadTablePosition({
            opts,
            badTable,
            badRow,
            badCell
        });
    }

    getWidth(): number {
        return this.badRow.nodes.size;
    }
    getHeight(): number {
        return this.badTable.nodes.size;
    }
    getRowIndex(): number {
        return this.badTable.nodes.indexOf(this.badRow);
    }
    getColumnIndex(): number {
        return this.badRow.nodes.indexOf(this.badCell);
    }
}
export default BadTablePosition;
