// @flow
import { insertFragmentAtRange as plugin } from 'slate-bind-copy-paste';
import { type Change, type Range, type Document } from 'slate';
import type Options from '../../options';
import { type typeRule } from './type';

import appendTableAtRangeEnd from './append-table-at-range-end';
import appendTableAtRangeStart from './append-table-at-range-start';
import insertTableInsideATable from './insert-table-inside-a-table';
import insertUnknownInDifferentCells from './insert-unknown-things-in-different-cell';
import insertUnknownInsideACell from './insert-unknown-things-inside-a-cell';
import finalTableSolution from './final-solution-for-table';

import { deleteAtRange } from '../deleteAtRange/index';

const {
    firstParagraphAsText,
    lastParagraphAsText,
    nodesAsBlocks
} = plugin.rules;

function makeRules(opts: Options): Array<typeRule> {
    return [
        insertTableInsideATable(opts),
        appendTableAtRangeStart(opts),
        appendTableAtRangeEnd(opts),
        insertUnknownInDifferentCells(opts),
        insertUnknownInsideACell(opts),
        finalTableSolution(opts),
        firstParagraphAsText,
        lastParagraphAsText,
        nodesAsBlocks
    ];
}

type typePatch = {
    rules: {
        insertFragmentAtRange: Array<typeRule>
    },
    changes: {
        insertFragmentAtRange: (Change, Range, Document, Object) => Change
    }
};

function makePatch(opts: Options): typePatch {
    return {
        rules: {
            insertFragmentAtRange: makeRules(opts)
        },
        changes: {
            insertFragmentAtRange: insertFragmentAtRange(opts)
        }
    };
}

function insertFragmentAtRange(opts: Options) {
    const rules = makeRules(opts);
    return plugin.generate(rules, {
        deleteAtRange: (c, r, o) => deleteAtRange(opts)(c, r, o)
    });
}

export default makePatch;
export { insertFragmentAtRange };
