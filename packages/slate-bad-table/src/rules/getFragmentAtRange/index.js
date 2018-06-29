// @flow
import { getFragmentAtRange as plugin } from 'slate-bind-copy-paste';
import { type Change, type Range, type Document } from 'slate';
import { type typeRule } from './type';
import type Options from '../../options';
import ifInSameCell from './ifInSameCell';
import ifEndInCell from './ifEndInCell';
import ifStartInCell from './ifStartInCell';
import ifStartInEditTable from './ifStartInEditTable';
import ifEndInEditTable from './ifEndInEditTable';

function makeRules(opts): Array<typeRule> {
    return [
        ifStartInEditTable(opts),
        ifEndInEditTable(opts),
        ifStartInCell(opts),
        ifEndInCell(opts),
        ifInSameCell(opts)
    ];
}

type typePatch = {
    rules: {
        getFragmentAtRange: Array<typeRule>
    },
    utils: { getFragmentAtRange: (Node, Range) => Document }
};

function makePatch(opts: Options): typePatch {
    return {
        rules: {
            getFragmentAtRange: makeRules(opts)
        },
        utils: {
            getFragmentAtRange: getFragmentAtRange(opts)
        }
    };
}
function getFragmentAtRange(opts: Options): (Change, Range) => Document {
    return plugin.generate(makeRules(opts));
}

export default makePatch;
export { getFragmentAtRange };
