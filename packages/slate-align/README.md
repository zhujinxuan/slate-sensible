# slate-align

Provides `data.textAlign` for blocks, providing `validateNode` for align blocks, providing `getStyle` and `getData` to convert between CSS style and slate `block.data`.

## Install

```
yarn add slate-align
```

or

```
npm i --save slate-align
```

## Simple Usage

```javascript
import AlignPlugin from "slate-align";
export default AlignPlugin(/* options */);
```

## Data Structure

```javascript
<block type="paragraph" textAlign="left" /* or "center", "right" */>
  {" "}
  /* content */{" "}
</block>
```

## Options

Option object you can pass to the plugin.

- `[floatBlocks : Array<string>]`: (Default : `['table', 'bad-table', 'image']`) block types whose rendering DOMs is aligned by `style.float` attribute.
- `[textBlocks: Array<string>]`: (Default: `['paragraph', 'heading', 'table_cell', 'bad-table-cell']`) block types whose rendering DOMs is aligned by `style.textAlign` attribute.

## Align Plugin

### `AlignPlugin(options: Options) => Instance`

Constructs an instance of the align plugin. Once the plugin is craeted, you get access to utilities, style convection and changes function.

### `plugin.validateNode`

This plugin provides normalization that removes all

### `plugin.utils`

#### `plugin.utils.getAlignBlocksAtRange`

```javascript
getAlignBlocksAtRange(range: Range, document: Document ) : Array<Block>
```

Get all align-able blocks within the range

### `plugin.changes`

#### `plugin.changes.removeAlignAtRange`

```javascript
removeAlignAtRange(change: Change, range: Range, align: string) : void
```

Unset all aligned blocks within the range whose `textAlign` is equal to `align`.

#### `plugin.changes.setAlignBlocksAtRange`

```javascript
setAlignBlocksAtRange(change: Change, range: Range, align: string) : void
```

Align all align-able blocks with `align` within the range.
