// @flow

import { type Node } from 'slate';
import getData from './getData';
import type Options from '../options';

type typeStyle = {
    float?: 'left' | 'center' | 'right',
    textAlign?: 'left' | 'center' | 'right'
};

function createStyle(opts: Options): { getStyle: Function, getData: Function } {
    const { textBlocks, floatBlocks } = opts;
    const getStyle = (block: Node): typeStyle => {
        if (block.object !== 'block') {
            return {};
        }
        const align = block.data.get('textAlign');
        if (!align || ['left', 'center', 'right'].indexOf(align) === -1) {
            return {};
        }
        if (textBlocks.indexOf(block.type) > -1) {
            return { textAlign: align };
        }
        if (floatBlocks.indexOf(block.type) > -1) {
            return { float: align };
        }
        return {};
    };
    return { getStyle, getData };
}

export default createStyle;
