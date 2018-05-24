import factory from './factory';
import slateOnSelect from '../../packages/slate-on-select/package.json';
import slateLineDelete from '../../packages/slate-delete-one-line/package.json';

const configurations = [...factory(slateOnSelect), ...factory(slateLineDelete)];

export default configurations;
