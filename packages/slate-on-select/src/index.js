// @flow
import React from 'react';
import getWindow from 'get-window';
import type { Change } from 'slate';
import { findRange } from 'slate-react';
import areRangesEquivalent from './utils/are-ranges-equivalent';

export default function createPlugin(opts): Object {
    const { inlineEnd = true, clickAndDrag = true } = opts || {};
    let isMouseMoving = false;
    let mouseMovingId;

    function onMouseMove(event: SyntheticMouseEvent<*>) {
        if (!clickAndDrag) return;

        const window = getWindow(event.target);
        window.clearTimeout(mouseMovingId);
        // It means the left key of mouse is pressed
        isMouseMoving = event.buttons % 2 === 1;

        if (isMouseMoving) {
            mouseMovingId = window.setTimeout(() => {
                isMouseMoving = false;
            }, 24);
        }
    }

    function renderEditor(props) {
        return <div onMouseMove={onMouseMove}>{props.children}</div>;
    }

    function onSelect(event: SyntheticEvent<*>, change: Change) {
        const window = getWindow(event.target);
        const { value } = change;
        const { selection, document } = value;
        const native = window.getSelection();

        if (!native.rangeCount) return undefined;
        const range = findRange(native, value);

        if (inlineEnd) {
            if (!range) return undefined;
            if (!range.anchorKey || !selection.anchorKey) return undefined;
            if (!range.focusKey || !selection.focusKey) return undefined;
            if (!range.isFocused || !selection.isFocused) return undefined;

            if (areRangesEquivalent(document, selection, range)) {
                return true;
            }
        }

        if (clickAndDrag && isMouseMoving) {
            if (range.isCollapsed && selection.isCollapsed) {
                change.select(
                    range.moveAnchorTo(
                        selection.anchorKey,
                        selection.anchorOffset
                    )
                );
                return true;
            }
        }

        return undefined;
    }
    return {
        onSelect,
        onMouseMove,
        renderEditor
    };
}
