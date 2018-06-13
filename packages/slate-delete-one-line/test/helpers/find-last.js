import findOffset from '../../src/changes/helpers/find-offset';

export default function findLast(arr) {
    const callback = offset => {
        const result = arr[offset];
        return result;
    };

    return findOffset(arr.length - 1, callback);
}
