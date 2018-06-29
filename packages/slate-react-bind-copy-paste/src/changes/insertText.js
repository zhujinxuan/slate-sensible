// @flow

import { type Set } from 'immutable';
import type Debug from 'debug';
import { type Change, type Mark, type Range, type Node } from 'slate';
import { type Option } from '../type';

export type typeInsertText = (Change, string, marks?: Set<Mark>) => Change;

function getInsertMarksAtRange(node: Node, range: Range): Set<Mark> {
    const { startOffset, startKey } = range;

    if (range.isCollapsed && startOffset === 0) {
        const startBlock = node.getClosestBlock(startKey);
        if (startBlock && startBlock.getFirstText().key === startKey) {
            let previousBlock = node.getPreviousBlock(startBlock.key);
            while (
                previousBlock &&
                previousBlock.type.indexOf('table') === -1
            ) {
                if (previousBlock.text.length !== 0) {
                    return node.getInsertMarksAtRange(
                        range.collapseToEndOf(previousBlock)
                    );
                }
                previousBlock = node.getPreviousBlock(previousBlock.key);
            }
        }
    }
    return node.getInsertMarksAtRange(range);
}

function insertText(opts: Option, debug: Debug): typeInsertText {
    return (change: Change, text: string, marks?: Set<Mark>) => {
        const { value } = change;
        const { document, selection } = value;
        marks =
            marks ||
            selection.marks ||
            getInsertMarksAtRange(document, selection);

        debug('insertText', { change, text, marks });
        change.insertTextByKey(value.startKey, value.startOffset, text, marks, {
            normalize: false
        });

        let range = selection.isBackward ? selection.flip() : selection;
        if (range.anchorKey === range.focusKey) {
            range = range.moveFocus(text.length);
        }
        range = range.moveAnchor(text.length);

        if (!range.isCollapsed) {
            const { startOffset, endOffset, startKey, endKey } = selection;
            const startBlock = document.getClosestBlock(startKey);
            const endBlock = document.getClosestBlock(endKey);
            const isHanging =
                startOffset === 0 &&
                endOffset === 0 &&
                !document.hasVoidParent(startKey) &&
                startBlock.getFirstText().key === startKey &&
                endBlock.getFirstText().key === endKey;
            if (isHanging) {
                range = range.moveFocusToEndOf(
                    document.getPreviousBlock(endBlock.key)
                );
            }
            opts.deleteAtRange(change, range, {
                snapshot: false,
                normalize: false
            });
        }

        if (!selection.isCollapsed) {
            change.normalize();
        }
        // If the text was successfully inserted, and the selection had marks on it,
        // unset the selection's marks.
        if (selection.marks && document != change.value.document) {
            change.select({ marks: null });
        }
        return change.collapseToEnd();
    };
}

export default insertText;
