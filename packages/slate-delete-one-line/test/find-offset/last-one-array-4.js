import findOffset from '../../src/changes/helpers/find-offset';

export const input = new Array(4).fill(false);
input[input.length - 1] = true;

export default function findLast(arr) {
    const callback = offset => {
        const result = arr[offset];
        if (typeof result !== 'boolean') {
            throw new Error('excede the array length in find-offset');
        }
        return result;
    };

    return findOffset(arr.length - 1, callback);
}

export const output = input.length - 1;
