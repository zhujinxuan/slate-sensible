// @flow

type Position = {
    left: string,
    top: string
};

type NumericPosition = {
    left: number,
    top: number
};

function translate(p: NumericPosition): Position {
    const result: Position = {};

    ['left', 'top'].forEach(key => {
        const value = p[key];
        if (!value) return;
        result[key] = `${value.toString(10)}px`;
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
    const position = {
        left: left - parent.left,
        top: bottom - parent.top
    };

    if (innerWidth < left || innerHeight < bottom) {
        return translate(position);
    }

    if (left + width < 0 || bottom + height < 0) {
        return translate(position);
    }

    if (left < 0) {
        position.left -= width;
        return translate(position);
    }

    if (bottom < 0) {
        position.top -= height;
        return translate(position);
    }

    if (left + width > innerWidth) {
        position.left -= width;
    }

    if (bottom + height < innerHeight) {
        position.top -= height;
    }
    return translate(position);
}

export default findBestPosition;
