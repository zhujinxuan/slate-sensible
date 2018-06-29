// @flow
import { type Change } from 'slate';
import isHotKey from 'is-hotkey';
import type Options from '../options';
import backspace from './backspace';

function createOnKeyDown(opts: Options): (*, Change) => Change | void {
    return (event, change) => {
        if (
            isHotKey('backspace', event) ||
            event.key.toLowerCase() === 'backspace'
        ) {
            return backspace(opts, change);
        }
        return undefined;
    };
}
export default createOnKeyDown;
