// @flow

function areTwoRectsSameLine(rect1: ClientRect, rect2: ClientRect) {
    return crossMid(rect1, getMid(rect2)) && crossMid(rect2, getMid(rect1));
}

function crossMid(rect: ClientRect, mid: number) {
    const { top, bottom } = rect;
    return top <= mid && bottom >= mid;
}

function getMid(rect: ClientRect) {
    const { top, bottom } = rect;
    return (top + bottom) / 2;
}

export default areTwoRectsSameLine;
