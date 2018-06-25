/* global expect */
import findOffset from '../find-offset';

function findLast(arr) {
    const callback = offset => arr[offset];
    return findOffset(arr.length - 1, callback);
}

describe('find-offset', () => {
    for (let length = 1; length < 11; length += 1) {
        const input = Array.from({ length }).fill(true);

        for (let first = 0; first < length; first += 1) {
            if (first !== 0) input[first - 1] = false;
            const testInput = input.slice();

            it(`${first}-in-${length}`, () => {
                expect(findLast(testInput)).toEqual(first);
            });
        }
    }
});
