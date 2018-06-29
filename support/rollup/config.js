import factory from './factory';
import slateAlign from '../../packages/slate-align/package.json';
import slateBadTable from '../../packages/slate-bad-table/package.json';
import slateBindCopyPaste from '../../packages/slate-bind-copy-paste/package.json';
import slateBetterSoftBreak from '../../packages/slate-better-soft-break/package.json';
import slateLineDelete from '../../packages/slate-delete-one-line/package.json';
import slateOnSelect from '../../packages/slate-on-select/package.json';
import slatePoorMentions from '../../packages/slate-poor-mentions/package.json';
import slateReactBindCopyPaste from '../../packages/slate-react-bind-copy-paste/package.json';
import slateTextTable from '../../packages/slate-text-table/package.json';

const configurations = [
    ...factory(slateAlign),
    ...factory(slateBadTable),
    ...factory(slateBindCopyPaste),
    ...factory(slateBetterSoftBreak),
    ...factory(slateLineDelete),
    ...factory(slateOnSelect),
    ...factory(slatePoorMentions),
    ...factory(slateReactBindCopyPaste),
    ...factory(slateTextTable)
];

export default configurations;
