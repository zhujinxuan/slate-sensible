# slate-better-soft-break

[![NPM version](https://badge.fury.io/js/slate-better-soft-break.svg)](http://badge.fury.io/js/slate-better-soft-break)

Allow users to insert `\n` by pressing `enter`, alike [`slate-soft-break`](https://github.com/ianstormtaylor/slate-plugins/tree/master/packages/slate-soft-break)

# Why this plugin

`slate-soft-break` allows `\n` into un-wanted blocks or inlines by paste. Therefore, `slate-better-soft-break` provide normalization to ensure:

1.  Disable `\n` in blocks disallowing soft-break
2.  Disable `\n` in inlines

## Install

```
yarn add slate-better-soft-break
```

## Simple Usage

```
import createSoftBreakPlugin from '../../lib/';
const plugin = createSoftBreakPlugin({
    softBreakIn: ['code', 'cell']
});
```

Options:

1.  `softBreakIn: Array<string>` block types allowing the soft-break
2.  `shiftIn: Array<string>` (optional) blocks types that enter soft-break with shift+enter
3.  `ignoreWhen(Event, Value) : boolean`: To ignore the `onKeyDown` function provided by this plugin
4.  `deleteAtRange()`(optional): You customized deleteAtRange for insert '\n';
