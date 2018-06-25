// @flow

type Position = {
    left?: string,
    right?: string,
    bottom?: string,
    top?: string
};

type NumericPosition = {
    left?: number,
    right?: number,
    bottom?: number,
    top?: number
};

function translate(p: NumericPosition): Position {
    const result: Position = {};

    Object.keys(p).forEach(key => {
        const value = p[key];
        p[key] = `${value}px`;
    });

    return result;
}

function findBestPosition(
    selection: ClientRect,
    menu: ClientRect,
    parent: ClientRect
): Position {
    const { height, width } = menu;
    const { innerWidth, innerHeight } = window;

    const { left, bottom } = selection;
    const defaultPosition = {
        left: left - parent.left,
        top: bottom - parent.top
    };

    if (innerWidth < left || innerHeight < bottom) {
        return translate(defaultPosition);
    }

    if (left + width < 0 || bottom + height < 0) {
        return translate(defaultPosition);
    }

    if (left < 0) {
        const position = {
            right: parent.right - selection.right,
            top: defaultPosition.top
        };
        return translate(position);
    }

    if (bottom < 0) {
        const position = {
            bottom: parent.bottom - selection.top,
            left: defaultPosition.left
        };
        return translate(position);
    }

    const position = {};

    if (left + width < innerWidth) {
        position.left = defaultPosition.left;
    } else {
        position.right = parent.right - selection.right;
    }

    if (bottom + height < innerHeight) {
        position.top = defaultPosition.top;
    } else {
        position.bottom = parent.bottom - selection.top;
    }
    return position;
}

function applyBestPosition(
    selection: Range,
    menu: HTMLElement,
    parent: ?Element = menu.offsetParent
): void {
    if (!parent) return;
    const position = findBestPosition(
        selection.getBoundingClientRect(),
        menu.getBoundingClientRect(),
        parent.getBoundingClientRect()
    );
    const { left = '', right = '', top = '', bottom = '' } = position;
    menu.style.left = left;
    menu.style.right = right;
    menu.style.top = top;
    menu.style.bottom = bottom;
    menu.style.display = 'block';
    menu.style.position = 'absolute';
}

export default applyBestPosition;
