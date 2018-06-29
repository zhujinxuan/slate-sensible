// @flow
import { type Change, Range, type Document } from 'slate';
import Debug from 'debug';
import { InsertAtRangeOptions, type typeRule } from './rules/type';
import firstParagraphAsText from './rules/firstParagraphAsText';
import lastParagraphAsText from './rules/lastParagraphAsText';
import nodesAsBlocks from './rules/nodesAsBlocks';
import deleteAtRangeGenerator from '../deleteAtRange';

const debug = new Debug('slate:changes:customized');
function bindRules(
    rules: Array<typeRule>,
    index: number,
    change: Change,
    range: Range,
    fragment: Document,
    opts: InsertAtRangeOptions
): Change {
    if (index === rules.length) {
        return change;
    }
    const rule = rules[index];
    const next = (insOpt: InsertAtRangeOptions) =>
        bindRules(rules, index + 1, change, range, fragment, insOpt);
    const rootInsert = (
        c: Change,
        r: Range,
        f: Document,
        insOpt: InsertAtRangeOptions
    ) => bindRules(rules, 0, c, r, f, insOpt);
    return rule(rootInsert, change, range, fragment, opts, next);
}

const defaultRules: Array<typeRule> = [
    firstParagraphAsText,
    lastParagraphAsText,
    nodesAsBlocks
];

const deleteAtRangeDefault = deleteAtRangeGenerator.generate();

type typeGenerateOptions = {
    deleteAtRange?: (Change, Range, Object) => *
};
export default {
    rules: {
        firstParagraphAsText,
        lastParagraphAsText,
        nodesAsBlocks
    },
    generate: (
        rules: Array<typeRule> = defaultRules,
        generateOptions: typeGenerateOptions = {}
    ) => (
        change: Change,
        range: Range,
        fragment: Document,
        opts: Object = {}
    ): Change => {
        debug('insertFragmentAtRange', { change, range, fragment, opts });
        const {
            normalize = true,
            lastNodeAsText = true,
            firstNodeAsText = true,
            snapshot = true,
            select = range === change.value.selection
        } = opts;
        const { deleteAtRange = deleteAtRangeDefault } = generateOptions;
        const { isFocused } = change.value;
        if (range.isBackward) {
            range = range.flip();
        }

        if (range.isExpanded) {
            deleteAtRange(change, range, {
                normalize: false,
                deleteStartText: false,
                deleteEndText: false,
                snapshot
            });
            if (range.endKey === range.startKey) {
                range = range.collapseToStart();
            } else {
                range = range.moveFocusTo(range.endKey, 0);
                if (!change.value.document.getDescendant(range.endKey)) {
                    range = range.collapseToStart();
                }
            }
        } else if (snapshot) {
            change.snapshotSelection();
        }
        fragment = fragment.set(
            'nodes',
            fragment.nodes
                .skipWhile(n => !n.isVoid && n.text === '')
                .reverse()
                .skipWhile(n => !n.isVoid && n.text === '')
                .reverse()
        );

        fragment = fragment.mapDescendants(child => child.regenerateKey());
        if (fragment.nodes.size === 0) {
            return change;
        }
        if (fragment.getTexts().size === 0) {
            return change;
        }

        bindRules(
            rules,
            0,
            change,
            range,
            fragment,
            new InsertAtRangeOptions({
                lastNodeAsText,
                firstNodeAsText
            })
        );

        if (select) {
            const lastValid = fragment
                .getTexts()
                .findLast(x => change.value.document.getDescendant(x.key));
            change.collapseToEndOf(lastValid);
            if (isFocused) {
                change.focus();
            }
        } else if (!select && change.value.selection.isExpannded) {
            const { selection } = change.value;
            change.select(selection.collapseToStart(), { snapshot: false });
        }
        if (normalize) {
            change.normalize();
        }
        return change;
    }
};
