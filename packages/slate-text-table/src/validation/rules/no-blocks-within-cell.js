// @flow

import type { Node } from 'slate';
import type { Rule } from '../types';
import type Options from '../../options';

/**
 * Rule to enforce cells only contain inlines or text.
 * It unwrap blocks in cell blocks
 */
export default function noBlocksWithinCell(opts: Options): Rule {
    return {
        match(node) {
            return node.object == 'block' && node.type == opts.typeCell;
        },

        // Find nested blocks
        validate(node) {
            const nestedBlocks = node.nodes.filter(
                child => child.object === 'block'
            );

            return nestedBlocks.size > 0 ? nestedBlocks : null;
        },

        // If any, unwrap all nested blocks
        normalize(change, node, nestedBlocks: Node[]) {
            nestedBlocks.forEach(block =>
                block.nodes.forEach(grandChild => {
                    change.unwrapNodeByKey(grandChild.key, {
                        normalize: false
                    });
                })
            );

            return change;
        }
    };
}
