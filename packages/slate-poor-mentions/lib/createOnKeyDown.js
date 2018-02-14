// @flow
import isHotkey from 'is-hotkey';
import { type Change } from 'slate';
import { InterfaceUpdater } from './type';

function createOnKeyDown(updater: InterfaceUpdater) {
    return (
        event: SyntheticKeyboardEvent<>,
        change: Change
    ): void | boolean => {
        if (!updater.isActive()) {
            return undefined;
        }
        if (isHotkey('down', event)) {
            event.preventDefault();
            updater.next();
            return true;
        }
        if (isHotkey('up', event)) {
            event.preventDefault();
            updater.previous();
            return true;
        }
        if (isHotkey('enter', event)) {
            const changeHOF = updater.changeHOF();
            if (!changeHOF) {
                return undefined;
            }
            event.preventDefault();
            changeHOF(change);
            return true;
        }
        return undefined;
    };
}
export default createOnKeyDown;
