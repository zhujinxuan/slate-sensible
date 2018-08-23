# slate-on-select

[![NPM version](https://badge.fury.io/js/slate-on-select.svg)](http://badge.fury.io/js/slate-on-select)

Fix two selection update problems:

1. Fix inline end problem by implementing [#1582](https://github.com/ianstormtaylor/slate/pull/1582)
2. Fix click and drag problem by implementing [#2014](https://github.com/ianstormtaylor/slate/pull/2104)

## Usage

```
yarn install slate-on-select
```

```
import SelectPlugin from 'slate-on-select'
export default SelectPlugin()
// export default SelectPlugin({inlineEnd: true, clickAndDrag: true})
```

## Options

### opts.inlineEnd (default true)

Fix inline end problem by [#1582](https://github.com/ianstormtaylor/slate/pull/1582)

### opts.clickAndDrag (default true)

Fix click and drag problem by [#2014](https://github.com/ianstormtaylor/slate/pull/2104)
