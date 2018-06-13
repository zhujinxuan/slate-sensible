Fix the problem of double selection of inline, by implement PR [#1582](https://github.com/ianstormtaylor/slate/pull/1582)

Required PR [#1614](https://github.com/ianstormtaylor/slate/pull/1614)

## Usage

```
yarn install slate-on-select
```

```
import createPlugin from 'slate-on-select'
const onSelectPlugin = createPlugin();
<Editor plugins={[onSelectPlugin]} />
```
