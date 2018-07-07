// @flow
// Old format for Slate rules

import type { Change, Node } from 'slate';

export type Normalizer = Change => any;
export type Validator = Node => void | Normalizer;

export type Rule = {
    match: Node => boolean,
    validate: Node => any,
    normalize: (Change, Node, any) => Normalizer
};
