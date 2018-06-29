/* eslint-disable import/no-extraneous-dependencies */
import BadTable from 'slate-bad-table';
import EditTable from 'slate-text-table';
import Paste from '../src/index';
import runChangesTest from './changes/index';

const badTablePlugin = BadTable();
const editTablePlugin = EditTable();

const { rules } = badTablePlugin;
const pastePlugin = Paste({ rules });
const plugins = [badTablePlugin, editTablePlugin, pastePlugin];
const { changes } = pastePlugin;

runChangesTest(plugins, changes);
