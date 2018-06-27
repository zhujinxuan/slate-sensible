import findBestPosition from '../find-best-position';
import './js-dom-helper';

window.resizeTo(769, 1000);

function createRect(rect) {
    const { left, top, width = 0, height = 34 } = rect;
    const { right = left + width, bottom = top + height } = rect;
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
        const selectionRect = createRect({ left: 110, top: 40, height: 34 });
        const menuRect = createRect({
            left: 0,
            right: 0,
            width: 100,
            height: 100
        });
        const position = findBestPosition(selectionRect, menuRect, parentRect);
        expect(position).toEqual({ left: '10px', top: '54px' });
    });
});
