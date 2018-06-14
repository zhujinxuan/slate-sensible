/* global expect */
import findOffset from '../../src/changes/helpers/find-offset';

export default function findLast(arr) {
    const callback = offset => {
        const result = arr[offset];
        return result;
    };

    return findOffset(arr.length - 1, callback);
}

for (let length = 0; length < 11; length += 1) {
    const input = Array.from({ length }).fill(true);
    for (let first = 0; first < length; first += 1) {
        if (first !== 0) input[first - 1] = false;
        const testInput = input.slice();
        it(`${first}-in-${length}`, () => {
            expect(first).toEqual(findLast(findLast(testInput)));
        });
    }
}
