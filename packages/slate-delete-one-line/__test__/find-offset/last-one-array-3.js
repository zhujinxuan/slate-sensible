import findLast from '../helpers/find-last';

export default findLast;

export const input = new Array(3).fill(false);
input[input.length - 1] = true;

export const output = input.length - 1;
