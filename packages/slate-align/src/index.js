// @flow
import Options, { type typeOptions } from './options';
import createStyle from './style/index';
import createUtils from './utils/index';
import createChanges from './changes/index';
import createValidateNode from './validateNode/index';

function createAlignPlugin(pluginOptions: typeOptions = {}) {
    const opt = new Options(pluginOptions);
    const style = createStyle(opt);
    const utils = createUtils(opt);
    const changes = createChanges(opt);
    const validateNode = createValidateNode(opt);

    return { style, utils, changes, validateNode };
}

export default createAlignPlugin;
