// @flow
import { type Node, type Text, type Change } from 'slate';
import type Options from '../options';

function createValidation(opts: Options) {
    const { textBlocks, floatBlocks } = opts;
    return (block: Node | Text): void | (Change => Change) => {
        if (block.object !== 'block') {
            return undefined;
        }
        if (!block.data || !block.data.get('textAlign')) return undefined;

        if (
            ['left', 'right', 'center'].indexOf(block.data.get('textAlign')) !==
            -1
        ) {
            if (textBlocks.indexOf(block.type) > -1) return undefined;
            if (floatBlocks.indexOf(block.type) > -1) return undefined;
        }

        const newData = block.data.delete('textAlign');
        return change =>
            change.setNodeByKey(
                block.key,
                { data: newData },
                { normalize: false }
            );
    };
}

export default createValidation;
