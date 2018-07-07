// @flow

import defaultOpts, { type Options } from './options';
import createValidateNode from './validateNode';
import createOnKeyDown from './onKeyDown';

function createPlugin(pluginOptions: {}) {
    const opts: Options = defaultOpts.merge(pluginOptions);
    const onKeyDown = createOnKeyDown(opts);
    const validateNode = createValidateNode(opts);
    return { onKeyDown, validateNode };
}

export default createPlugin;
