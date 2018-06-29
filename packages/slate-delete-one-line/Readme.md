# slate-delete-one-line

[![NPM version](https://badge.fury.io/js/slate-delete-one-line.svg)](http://badge.fury.io/js/slate-delete-one-line)

Delete a visual line rather than a block line.

Fix [#1623](https://github.com/ianstormtaylor/slate/issues/1623)

## Usage

1.  install with `yarn install slate-delete-one-line`
2.  use this package as a plugin to hack `onKeyDown`

```
import LineDelete from 'slate-delete-one-line'
export default LineDelete()
```

### Arguments

```
import LineDelete from 'slate-delete-one-line'
const plugin = LineDelete({forward: true, backward: true})
```

1.  `forward`: (default: true) whether or not hack deleteForwardLine
2.  `backward`: (default: true) whether or not hack deleteBackwardLine

### Notice:

By May-2018, there is a bug in slate core deleteForwardLine. This package override the default deleteForwardLine as well.
