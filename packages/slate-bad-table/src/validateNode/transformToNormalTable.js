// @flow
import { isTextBlock, getFirstBlock } from 'slate-bind-copy-paste';
import { type Node, type Change, Text } from 'slate';
import type Options from '../options';

function validateNode(opts: Options, table: Node): (Change => Change) | void {
    if (table.object !== 'block' || table.type !== opts.typeBadTable) {
        return undefined;
    }
    const shouldConvert = table.nodes.every(row => {
        if (row.type !== opts.typeBadRow) return false;
        return row.nodes.every(cell => {
            if (cell.nodes.size > 1 && !opts.allowSoftBreak) {
                return false;
            }
            if (cell.type !== opts.typeBadCell) return false;
            return cell.nodes.every(n => isTextBlock(n));
        });
    });

    if (!shouldConvert) {
        return undefined;
    }
    const nextTable = table.merge({
        type: opts.typeTable,
        nodes: table.nodes.map(row =>
            row.merge({
                type: opts.typeRow,
                nodes: row.nodes.map(cell => {
                    const blocks = cell.nodes.shift();
                    const nextNodes = blocks.reduce(
                        (cache, block) =>
                            cache
                                .push(Text.create('\n'))
                                .concat(getFirstBlock(block).nodes),
                        getFirstBlock(cell.nodes.first()).nodes
                    );
                    return cell.merge({
                        nodes: nextNodes,
                        type: opts.typeCell
                    });
                })
            })
        )
    });

    return change => {
        const { selection } = change.value;
        change.replaceNodeByKey(nextTable.key, nextTable, { normalize: false });
        if (change.value.selection !== selection) {
            change.select(selection);
        }
        const parent = change.value.document.getParent(nextTable.key);
        change.normalizeNodeByKey(parent.key);
    };
}

export default validateNode;
