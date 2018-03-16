// @flow
import { type Value, type Range, type Mark, type Change } from 'slate';
import type { InterfaceUpdater } from './type';

function halfClosedFindMention(value, findMentionRange, beforeMatchRegex) {
    if (!value.isFocused) return null;
    if (value.isExpanded) return null;
    const range = findMentionRange(value);
    if (range) return range;
    const text = value.focusText;
    const key = value.focusKey;
    const focusOffset = value.focusOffset;
    const beforeString = text.text.substring(0, focusOffset);
    const beforeMatch = beforeString.match(/{ *\$[^{}\n]*$/);
    if (!beforeMatch) {
        return null;
    }
    const anchorOffset = beforeMatch.index;

    const selection = value.selection.isBackward
        ? value.selection.flip()
        : value.selection;
    return selection.moveAnchor(key, anchorOffset);
}

function createOnChangeDecoration(
    findMentionRange: Value => null | Range,
    updater: InterfaceUpdater,
    beforeMatchRegex: RegExp,
    decoMark: Mark
) {
    return (change: Change): void => {
        if (!updater.isActive) return;
        if (!updater.isActive()) {
            const { decorations } = change.value;
            if (!decorations) return;
            const nextDecorations = decorations.filter(
                x => !x.marks || !x.marks.find(m => m.type === decoMark.type)
            );
            if (nextDecorations.size === decorations.size) return;
            change
                .setOperationFlag('save', false)
                .setValue({ decorations: nextDecorations })
                .setOperationFlag('save', true);
            return;
        }
        const { value } = change;

        const range = halfClosedFindMention(
            value,
            findMentionRange,
            beforeMatchRegex
        );
        if (!range && !value.decorations) return;

        if (!range) {
            const nextDecorations = value.decorations.filter(
                x => !x.marks || !x.marks.find(m => m.type === decoMark.type)
            );
            if (nextDecorations.size === value.decorations.size) return;
            change
                .setOperationFlag('save', false)
                .setValue({ decorations: nextDecorations })
                .setOperationFlag('save', true);
            return;
        }

        const { anchorKey, focusKey, anchorOffset, focusOffset } = range;
        let decorations = [
            {
                anchorKey,
                focusKey,
                anchorOffset,
                focusOffset,
                marks: [decoMark]
            }
        ];

        if (value.decorations) {
            const found = value.decorations.find(
                r =>
                    r.marks.find(m => m.type === decoMark.type) &&
                    r.startKey === range.startKey &&
                    r.endKey === range.endKey &&
                    r.startOffset === range.startOffset &&
                    r.endOffset === range.endOffset
            );
            if (found) return;
            decorations = value.decorations
                .filter(
                    r =>
                        !r.marks || !r.marks.find(m => m.type === decoMark.type)
                )
                .toArray()
                .concat(decorations);
        }

        change
            .setOperationFlag('save', false)
            .setValue({ decorations })
            .setOperationFlag('save', true);
    };
}
export default createOnChangeDecoration;
