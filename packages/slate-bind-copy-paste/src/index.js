// @flow

import getFragmentAtRange from './getFragmentAtRange';
import insertFragmentAtRange from './insertFragmentAtRange';
import deleteAtRange from './deleteAtRange';
import isTextBlock from './utils/isTextBlock';
import getFirstBlock from './utils/getFirstBlock';
import getLastBlock from './utils/getLastBlock';
import isStartByKey from './utils/isStartByKey';
import isEndByKey from './utils/isEndByKey';
import {
    type DeleteAtRangeOptions,
    type typeRule as typeDeleteAtRangeRule
} from './deleteAtRange/rules/type';
import {
    type GetAtRangeOptions,
    type typeRule as typeGetFragmentAtRangeRule
} from './getFragmentAtRange/rules/type';
import {
    type InsertAtRangeOptions,
    type typeRule as typeInsertFragmentAtRangeRule
} from './insertFragmentAtRange/rules/type';

export {
    getFragmentAtRange,
    insertFragmentAtRange,
    deleteAtRange,
    isTextBlock,
    getFirstBlock,
    getLastBlock,
    isStartByKey,
    isEndByKey
};

export type {
    typeDeleteAtRangeRule,
    typeInsertFragmentAtRangeRule,
    typeGetFragmentAtRangeRule,
    DeleteAtRangeOptions,
    GetAtRangeOptions,
    InsertAtRangeOptions
};
