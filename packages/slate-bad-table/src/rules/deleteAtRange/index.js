// @flow
import { deleteAtRange as plugin } from 'slate-bind-copy-paste';
import { type Change, type Range, type Object } from 'slate';
import type Options from '../../options';
import { type typeRule } from './type';
import ifStartInCell from './ifStartInCell';
import ifEndInCell from './ifEndInCell';
import ifInSameCell from './ifInSameCell';
import ifStartInEditTable from './ifStartInEditTable';
import ifEndInEditTable from './ifEndInEditTable';
import ifInSameEditTable from './ifInSameEditTable';

const { atDifferentText, atSameText } = plugin.rules;
function makeRules(opts: Options): Array<typeRule> {
    return [
        ifStartInCell(opts),
        ifEndInCell(opts),
        ifInSameCell(opts),
        ifStartInEditTable(opts),
        ifEndInEditTable(opts),
        ifInSameEditTable(opts),
        atDifferentText,
        atSameText
    ];
}

type typePatch = {
    rules: {
        deleteAtRange: Array<typeRule>
    },
    changes: { deleteAtRange: (Change, Range, Object) => Change }
};

function makePatch(opts: Options): typePatch {
    return {
        rules: {
            deleteAtRange: makeRules(opts)
        },
        changes: {
            deleteAtRange: deleteAtRange(opts)
        }
    };
}

function deleteAtRange(opts: Options): (Change, Range, Object) => Change {
    return plugin.generate(makeRules(opts));
}

export default makePatch;
export { deleteAtRange };
