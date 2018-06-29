# slate-bad-table

A slate plugin to handle table nested with block; this plugin is expected to be used with GitbookIO/slate-edit-table

## Install
```
npm i --save slate-bad-table
```

## Features

1. Provides customized `getFragmentAtRange` and `deleteAtRange` for copy/paste
2. Provides rules for customizing your own `getFragmentAtRange` and `deleteAtRange`

## Simple Usage
```
import createBadTablePlugin from 'slate-bad-table';
const plugins = [createBadTablePlugin()]
```
### Arguments
 - `[typeBadTable: 'bad-table']` string for the table type
 - `[typeBadRow: 'bad-table-row']` string for the row type
 - `[typeBadCell: 'bad-table-cell']` string for the cell type
 - `[typeParagraph: 'paragraph']` string for paragraph type

## Utils 

##### `utils.getFragmentAtRange(node: Node, range: Range): Document`

Customized method for copying.  The method memics the default `node.getFragmentAtRange`, but tries to avoid `bad-table*` in the returned fragment;

##### `utils.isSelectionInCell(value: Value): boolean`
Return true if selection is inside a `bad-table-cell`

##### `utils.isSelectionOutOfCell`
Return true if selection starts and ends both outside any bad table. (Notice: it is NOT the opposite value of isSelectionInCell)


## Changes
##### `changes.deleteAtRange(change: Change, range: Range, {normalize: true}) : Change`
Customized method for delete and paste at range.  The method memics the default `change.deleteAtRange`, but tries to keep valid bad tables.
Optional option `normalize` is for enable/disable normalization after deleteAtRange

##### `changes.removeTable(value:Value, {snapshot: true}) => Change`
remove bad-table if the focus is in the table

##### `changes.removeRow(value:Value, {snapshot: true}) => Change`
remove bad-table-row if the focus is in the row;

##### `changes.removeRow(value:Value, {snapshot: true}) => Change`
remove bad-table-row if the focus is in the row;

## Rules
Rules for rules-combinator for customizing copy/paste logic with other plugins

##### `rules.getFragmentAtRange: Array< ( getFragmentAtRange: (Node, Range) => Document, node: Node, range: Range, next: () => Document ): Document >`
- `getFragmentAtRange` for the root function entry, used for node or range change;  You can see example of usage at `lib/rules/getFragmentAtRange/ifStartInCell`
- `node`, `range`: node and range
- `next` evaluate the following rules
for binding rules, see example at `lib/rules/getFragmentAtRange/index`

##### `rules.deleteAtRange: Array< ( deleteAtRange: (Change, Range) => Change, node: Node, range: Range, next: () => Change ): Change >`
- `deleteAtRange` for the root function entry, used for range change;  You can see example of usage at `lib/rules/deleteAtRange/ifStartInCell`
- `change`, `range`: change and range
- `next` evaluate the following rules
for binding rules, see example at `lib/rules/deleteAtRange/index`
