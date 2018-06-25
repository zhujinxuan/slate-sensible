// @flow
import findBestPosition from './find-best-position';

function applyBestPosition(
    selection: Range,
    menu: HTMLElement,
    parent: ?Element = menu.offsetParent
): void {
    if (!parent) return;
    if (!menu.firstChild) return;
    const position = findBestPosition(
        selection.getBoundingClientRect(),
        menu.firstChild.getBoundingClientRect(),
        parent.getBoundingClientRect()
    );
    const { left = '', top = '' } = position;
    menu.style.left = left;
    menu.style.top = top;
    menu.style.display = 'block';
    menu.style.position = 'absolute';
}

export default applyBestPosition;
