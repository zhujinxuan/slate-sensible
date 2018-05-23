import factory from './factory'
import slateOnSelect from '../../packages/slate-on-select/package.json'

const configurations = [
  ...factory(slateOnSelect),
]

export default configurations
