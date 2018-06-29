// @flow

import { type Value } from 'slate';
import type Options from '../options';
import isSelectionInCell from './isSelectionInCell';
import isSelectionOutOfCell from './isSelectionOutOfCell';

type typeUtils = {
    isSelectionInCell: Value => boolean,
    isSelectionOutOfCell: Value => boolean
};
function createUtils(opts: Options): typeUtils {
    return {
        isSelectionInCell: isSelectionInCell(opts),
        isSelectionOutOfCell: isSelectionOutOfCell(opts)
    };
}

export default createUtils;
