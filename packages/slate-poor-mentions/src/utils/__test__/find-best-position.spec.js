import './js-dom-helper';
import findBestPosition from '../find-best-position';

window.resizeTo(1024, 768);

function createRect(rect) {
    let { left, right, top, bottom } = rect;
    let { height = bottom - top, width = right - left } = rect;
    if (!Number.isFinite(height)) height = 0;
    if (!Number.isFinite(width)) width = 0;
    if (!Number.isFinite(left)) left = right - width;
    if (!Number.isFinite(right)) right = left + width;
    if (!Number.isFinite(top)) top = bottom - height;
    if (!Number.isFinite(bottom)) bottom = top + height;

    return {
        left,
        top,
        width,
        height,
        right,
        bottom
    };
}

describe('find-best-position', () => {
    const parentRect = { left: 100, top: 20 };

    it('left-top', () => {
        const selectionRect = createRect({ left: 110, bottom: 40 });
        const menuRect = createRect({
            left: 0,
            right: 0,
            width: 100,
            height: 100
        });
        const position = findBestPosition(selectionRect, menuRect, parentRect);
        expect(position).toEqual({ left: '10px', top: '20px' });
    });

    it('left-top-by-outside', () => {
        const selectionRect = createRect({ left: -200, bottom: -100 });
        const menuRect = createRect({
            left: 0,
            right: 0,
            width: 100,
            height: 100
        });
        const position = findBestPosition(selectionRect, menuRect, parentRect);
        expect(position).toEqual({ left: '-300px', top: '-120px' });
    });

    it('left-top-by-outside-excess', () => {
        const selectionRect = createRect({ left: 9999, bottom: 9999 });
        const menuRect = createRect({
            left: 0,
            right: 0,
            width: 100,
            height: 100
        });
        const position = findBestPosition(selectionRect, menuRect, parentRect);
        expect(position).toEqual({ left: '9899px', top: '9979px' });
    });

    it('right-bottom', () => {
        const selectionRect = createRect({ left: 1020, bottom: 700 });
        const menuRect = createRect({
            left: 0,
            right: 0,
            width: 100,
            height: 100
        });
        const position = findBestPosition(selectionRect, menuRect, parentRect);
        expect(position).toEqual({ left: '820px', top: '580px' });
    });

    it('right-top-outside', () => {
        const selectionRect = createRect({ left: -50, bottom: -40 });
        const menuRect = createRect({
            left: 0,
            right: 0,
            width: 100,
            height: 100
        });
        const position = findBestPosition(selectionRect, menuRect, parentRect);
        expect(position).toEqual({ left: '-250px', top: '-60px' });
    });

    it('left-bottom-outside', () => {
        const selectionRect = createRect({ left: 100, bottom: -40 });
        const menuRect = createRect({
            left: 0,
            right: 0,
            width: 100,
            height: 100
        });
        const position = findBestPosition(selectionRect, menuRect, parentRect);
        expect(position).toEqual({ left: '0px', top: '-160px' });
    });
});
