// @flow
import { type Change } from 'slate';
import type Options from './options';

function createOnKeyDown(opts: Options) {
    return (
        event: SyntheticKeyboardEvent<*>,
        change: Change
    ): void | Change => {
        if (event.key !== 'Enter') return undefined;
        const { ignoreWhen, softBreakIn, shiftIn } = opts;
        if (ignoreWhen(event, change.value)) {
            return undefined;
        }
        const { value } = change;
        const { startBlock, endBlock } = value;
        if (!startBlock) return undefined;
        if (startBlock.isVoid) return undefined;
        if (softBreakIn.indexOf(startBlock.type) === -1) return undefined;
        if (!event.shiftKey && shiftIn.indexOf(startBlock.type) !== -1) {
            return undefined;
        }

        if (startBlock === endBlock) {
            event.preventDefault();
            change.insertText('\n');
            return true;
        }
        const { deleteAtRange } = opts;
        deleteAtRange(change, value.selection, {
            deleteStartText: false,
            deleteEndText: true,
            snapshot: true,
            normalize: true
        });
        change.collapseToStart();
        const newStartBlock = change.value.startBlock;
        if (!newStartBlock) return undefined;
        if (newStartBlock.isVoid) return undefined;
        if (softBreakIn.indexOf(newStartBlock.type) === -1) return undefined;
        if (event.shiftKey && shiftIn.indexOf(newStartBlock.type) === -1) {
            return undefined;
        }
        event.preventDefault();
        return change.insertText('\n');
    };
}
export default createOnKeyDown;
