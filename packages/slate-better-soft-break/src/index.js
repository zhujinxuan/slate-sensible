// @flow

import Options, { type typeOpts } from './options';
import createValidateNode from './validateNode';
import createOnKeyDown from './onKeyDown';

function createPlugin(pluginOptions: typeOpts) {
    const opts = new Options(pluginOptions);
    const onKeyDown = createOnKeyDown(opts);
    const validateNode = createValidateNode(opts);
    return { onKeyDown, validateNode };
}
export default createPlugin;
