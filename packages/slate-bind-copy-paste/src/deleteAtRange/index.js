// @flow
import { type Change, Range } from 'slate';
import Debug from 'debug';
import { DeleteAtRangeOptions, type typeRule } from './rules/type';
import atWholeDocument from './rules/atWholeDocument';
import atDifferentText from './rules/atDifferentText';
import atSameText from './rules/atSameText';

const debug = new Debug('slate:changes:customized');

function bindRules(
    rules: Array<typeRule>,
    index: number,
    change: Change,
    range: Range,
    opts: DeleteAtRangeOptions
): Change {
    if (index === rules.length) {
        return change;
    }

    const rule = rules[index];
    const next = removeOptions =>
        bindRules(rules, index + 1, change, range, removeOptions);
    const rootDeleteAtRange = (
        n: Change,
        r: Range,
        removeOptions: DeleteAtRangeOptions
    ) => bindRules(rules, 0, n, r, removeOptions);
    return rule(rootDeleteAtRange, change, range, opts, next);
}

const defaultRules: Array<typeRule> = [
    atWholeDocument,
    atDifferentText,
    atSameText
];

export default {
    rules: { atWholeDocument, atDifferentText, atSameText },
    generate: (rules: Array<typeRule> = defaultRules) => (
        change: Change,
        range: Range,
        opts: Object = {}
    ): Change => {
        debug('deleteAtRange', { change, range, opts });
        const {
            normalize = true,
            deleteStartText = false,
            snapshot = true,
            deleteEndText = true
        } = opts;

        if (snapshot) {
            change.snapshotSelection();
        }

        if (range.isBackward) {
            const { startKey, startOffset, endKey, endOffset } = range;

            range = Range.create()
                .moveAnchorTo(startKey, startOffset)
                .moveFocusTo(endKey, endOffset);
        }

        bindRules(
            rules,
            0,
            change,
            range,
            new DeleteAtRangeOptions({ deleteStartText, deleteEndText })
        );

        if (normalize) {
            change.normalize();
        }
        return change;
    }
};
