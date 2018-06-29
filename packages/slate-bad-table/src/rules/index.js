// @flow
import { type Change, type Node, type Range, type Document } from 'slate';
import type Options from '../options';
import createPatchGetFragmentAtRange from './getFragmentAtRange/index';
import createPatchDeleteAtRange from './deleteAtRange/index';
import createPatchInsertAtRange from './insertFragmentAtRange/index';

import { type typeRule as typeInsertRule } from './insertFragmentAtRange/type';
import { type typeRule as typeDeleteRule } from './deleteAtRange/type';
import { type typeRule as typeGetRule } from './getFragmentAtRange/type';

export type typeRules = {
    getFragmentAtRange: Array<typeGetRule>,
    deleteAtRange: Array<typeDeleteRule>,
    insertFragmentAtRange: Array<typeInsertRule>
};

type typePatch = {
    utils: {
        getFragmentAtRange: (Node, Range) => Document
    },
    changes: {
        deleteAtRange: (Change, Range, Object) => Change,
        insertFragmentAtRange: (Change, Range, Document, Object) => Change
    },
    rules: typeRules
};

function createPatch(opts: Options): typePatch {
    const patchGetFragmentAtRange = createPatchGetFragmentAtRange(opts);
    const patchDeleteAtRange = createPatchDeleteAtRange(opts);
    const patchInsert = createPatchInsertAtRange(opts);
    return {
        utils: patchGetFragmentAtRange.utils,
        changes: { ...patchDeleteAtRange.changes, ...patchInsert.changes },
        rules: {
            ...patchGetFragmentAtRange.rules,
            ...patchDeleteAtRange.rules,
            ...patchInsert.rules
        }
    };
}

export default createPatch;
