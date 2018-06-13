import findLast from '../helpers/find-last';

export const input = new Array(2).fill(false);
input[input.length - 1] = true;

export default findLast;
export const output = input.length - 1;
