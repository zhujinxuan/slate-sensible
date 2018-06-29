// @flow
import { type Node, Range, type Document } from 'slate';
import { GetAtRangeOptions, type typeRule } from './rules/type';

function bindRules(
    rules: Array<typeRule>,
    index: number,
    node: Node,
    range: Range,
    opts: GetAtRangeOptions
): Document {
    if (index === rules.length) {
        return node.getFragmentAtRange(range);
    }
    const rule = rules[index];
    const next = (getOpts: GetAtRangeOptions) =>
        bindRules(rules, index + 1, node, range, getOpts);
    const rootGetFragment = (n: Node, r: Range, o: GetAtRangeOptions) =>
        bindRules(rules, 0, n, r, o);
    return rule(rootGetFragment, node, range, opts, next);
}

export default {
    generate: (rules: Array<typeRule> = []) => (
        node: Node,
        range: Range
    ): Document => {
        if (range.isBackward) {
            const { startKey, startOffset, endKey, endOffset } = range;
            range = Range.create()
                .moveAnchorTo(startKey, startOffset)
                .moveFocusTo(endKey, endOffset);
        }
        return bindRules(rules, 0, node, range, new GetAtRangeOptions());
    }
};
