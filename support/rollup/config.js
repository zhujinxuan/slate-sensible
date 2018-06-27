import factory from './factory';
import slateOnSelect from '../../packages/slate-on-select/package.json';
import slateLineDelete from '../../packages/slate-delete-one-line/package.json';
import slatePoorMentions from '../../packages/slate-poor-mentions/package.json';

const configurations = [
    ...factory(slateOnSelect),
    ...factory(slateLineDelete),
    ...factory(slatePoorMentions)
];

export default configurations;