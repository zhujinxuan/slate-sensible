// @flow
import { type Change, type Node } from 'slate';
import createSchema from './schema/index';
import createUtils from './utils/index';
import createChanges from './changes/index';
import Options, { type OptionsFormat } from './options';
import createRulesPatch, { type typeRules } from './rules/index';
import createValidateNode from './validateNode/index';
import createOnKeyDown from './onKeyDown/index';

type typePlugins = {
    schema: Object,
    utils: Object,
    onKeyDown: (*, Change) => Change | void,
    rules: typeRules,
    changes: Object,
    validateNode: Node => (Change => Change) | void
};

function createBadTablePlugin(pluginOpts: OptionsFormat): typePlugins {
    const opts = new Options(pluginOpts);
    const schema = createSchema(opts);
    const rulesPatch = createRulesPatch(opts);
    const utils = createUtils(opts);
    const onKeyDown = createOnKeyDown(opts);
    const changes = createChanges(opts);
    return {
        schema,
        utils: { ...utils, ...rulesPatch.utils },
        onKeyDown,
        rules: rulesPatch.rules,
        changes: { ...changes, ...rulesPatch.changes },
        validateNode: createValidateNode(opts)
    };
}

export default createBadTablePlugin;
export type { typeRules };
