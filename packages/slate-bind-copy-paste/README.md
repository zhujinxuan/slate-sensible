# slate-bind-copy-paste

[![NPM version](https://badge.fury.io/js/slate-bind-copy-paste.svg)](http://badge.fury.io/js/slate-bind-copy-paste)

This plugin generates and helps to generate wiser range operations of `deleteAtRange`, `insertFragmentAtRange`, `getFragmentAtRange`

## Usage
```
  yarn add --save slate-bind-copy-paste
```

```
  import { getFragmentAtRange as getPlugin, insertFragmentAtRange as insertPlugin, deleteAtRange as deletePlugin} from 'slate-bind-copy-paste';
  const getFragmentAtRange = getPlugin.generate(getRules)
  const insertFragmentAtRange = insertPlugin.generate(insertRules)
  const deleteAtRange = deletePlugin.generate(deleteRules)
```

### API
Because `getFragmentAtRange`, `deleteAtRange`, `insertFragmentAtRange` are often configured in different files, I think it is better not to `export default`.
Then you can load them with alias.

#### getFragmentAtRange
```
import { getFragmentAtRange as plugin} from 'slate-bind-copy-paste'
const getFragmentAtRange : (Node, Range) => Document = plugin.generate(rules: Array<GetRule>)
```
If no rules are specified, the function will behave like the slate's `getFragmentAtRange`. 
`rules` are a set of the rule explained as below:

```
type GetRule =  (
    rootGet: (Node, Range, Options) => Document,
    node: Node,
    range: Range,
    option: Options,
    next: (Options) => Document
) => Document;
Options: Immutable.Record({startText: Text, endText: Text, startAncestors: List<Node>, endAncestors: List<Node>})
```
Argument:
1. `rootGet`: Transfer the control to the first rule of `rules`, used when reset the `node` or `range`.
2. `node`: The root node for `getFragmentAtRange`
3. `range`: The range of getting fragment
4. `option`: a set of convinient variables to simplify the code; Do not worry about `option`, the option will be normalized with the corrent `{Edge}Text` and `{Edge}Ancestors` in each call of `next` and `rootGet`
5. `next`: Transfer the control to the next rule of `rules`, keeping `node` and `range`

For exmample, this is a rule not copying the void Block at the start;

```
function noVoidStart(rootGet, node, range, option, next) {
  const {startAncestors} = option;
  if (startAncestors.find(n => n.isVoid)) {
    if (range.startKey === range.endKey) {
      return Document.create({nodes:[]})
    }
    const nextText = node.getNextText(range.startKey);
    range = range.moveAnchorToStartOf(nextText)
    return rootGet(node, range, option)
  }
  return next(option)
}
```

For more example usage, see `zhujinxuan/slate-bad-table` in `lib/rules/getFragmentAtRange`

#### deleteAtRange
```
import { deleteAtRange as plugin} from 'slate-bind-copy-paste'
const deleteAtRange  = plugin.generate(rules: Array<DeleteRule>)
```
If no rules are specified, the function will behave like the slate's `deleteAtRange`. 
`rules` are a set of the rule explained as below:

```
type DeleteRule = (
    rootDelete: (Change, Range, Options) => Change,
    change: Change,
    range: Range,
    option: Options,
    next: (Options) => Change
) => Change;
Options: Immutable.Record({startText: Text, endText: Text, startAncestors: List<Node>, endAncestors: List<Node>, deleteStartText: boolean, deleteEndText: boolean})
```
Argument:
1. `rootDelete`: Transfer the control to the first rule of `rules`, used when reset the `node`,`range` or `option.delete{Edge}Text`
2. `change`: change
3. `range`: range for delete
4. `option`: 
  - `deleteStartText`: whether to remove Text node if the range is at the start of the Text
  - `deleteEndText`: whether to remove Text node if the range is at the end of the Text
  - `{Edge}Text` and `{Edge}Ancestors` convenient variables, automatically normalized in `rootGet` and `next`
5. `next`: Transfer control to the next rule.  You can reset `option.delete{Edge}Text` in calling this rule

The generated `deleteAtRange` is called with
```
deleteAtRange : (change: Change, range: Range, {normalize, snapshot, deleteStartText, deleteEndText})
```
1. `normalize`: by default `true`
1. `snapshot` is whether to snapshot the selection, incaseof avoiding undo bugs, by default `true`
2. `deleteStartText`: whether to remove Text node if the range is at the start of the Text, by default `false` for the first rule
3. `deleteEndText`: whether to remove Text node if the range is at the end of the Text, by default `true` for the first rule

For more example usage, see `lib/deleteAtRange/rules` or `zhujinxuan/slate-bad-table` in `lib/rules/deleteAtRange`

#### insertFragmentAtRange

```
import { insertFragmentAtRange as plugin} from 'slate-bind-copy-paste'
const insertFragmentAtRange  = plugin.generate(rules: Array<InsertRule>)
```
If no rules are specified, the function will behave like the insertFragmentAtRange in [Slate's PR 1553](https://github.com/ianstormtaylor/slate/pull/1553).
`rules` are a set of the rule explained as below:

```
type InsertRule = (
    rootDelete: (Change, Range, Document, Options) => Change,
    change: Change,
    range: Range,
    fragment: Document,
    option: Options,
    (Options) => Change
) => Change;
Options: Immutable.Record({`Edge`Text: Text, `Edge`Ancestors: List<Node>, firstNodeAsText: boolean, lastNodeAsText: boolean})
```
Argument:
1. `rootDelete`: transfer the control to the first rule. used when reset `node`, `range`, `fragment`, `option.{Where}AsText`
2. `change`: change
3. `range`: range for insertFragmentAtRange, you can take `range.startKey` and `range.startOffset` if you like.  However, this is not automatically collapsed because 
someone may want to implement a feature `getFragmentAtRange + insertFragmentAtRange` do not change significantly.
4. `fragment` fragment for insert
5. `option`
  - `firstNodeAsText`: whether tries to concat first fragment node as Text
  - `deleteEndText`: whethere tries to concat last fragment node as Text
  - `{Edge}Text` and `{Edge}Ancestors` convenient variables, automatically normalized in `rootGet` and `next`
5. `next`: Transfer control to the next rule.  You can reset `option.{Where}AsText` in calling this rule

The generated function is called with
```
insertFragmentAtRange : (change: Change, range: Range, fragment: Document,  {normalize, snapshot, firstNodeAsText, lastNodeAsText, deleteAtRange})
```
1. `normalize`: by default `true`
1. `snapshot` is whether to snapshot the selection, incaseof avoiding undo bugs, by default `true`
2. `firstNodeAsText`: whether to concat texts in the first fragment node, by default `true` for the first rule
3. `lastNodeAsText`: whether to concat texts in the last fragment node, by default `true` for the first rule
4. `deleteAtRange: (Change, Range, {snapshot: false, deleteStartText: false, deleteEndText: false, normalize: false})`, by default use slate's `change.deleteAtRange`.  Delete content in the range before insert.

For more exmple usage, see `lib/insertFragmentAtRange/rules` or `zhujinxuan/slate-bad-table` in `lib/rules/insertFragmentAtRange`

### pre-defined rules:
#### deleteAtRange
```
import { deleteAtRange as plugin} from 'slate-bind-copy-paste'
const {atDifferentText, atSameText} = plugin.rules;
```
1. `atDifferentText` called when `startKey` and `endKey` are different. Behavior are alike:
  - if same Text at both edges, transfer control to next rule
  - if `deleteStartText: false` or `startOffset !== 0`, delete the text content in , transfer control to the first rule
  - delete all nodes from startText to the `commonAncestor.child` which is not an ancestor of `endText`, transfer control to the first rule
2. `atSameText` called when when `startKey` and `endKey` are same. If the edges are different Texts, then transfer control to the next rule

#### insertFragmentAtRange
```
import { insertFragmentAtRange as plugin} from 'slate-bind-copy-paste'
const {firstParagraphAsText, lastParagraphAsText, nodesAsBlocks}  = plugin.rules
```
1. `firstParagraphAsText`: Tries to concat the first fragment node as Text
2. `lastParagraphAsText`: Tries to concat the last fragment node as Text
3. `nodesAsBlocks`: Insert fragment nodes as blocks in the range with `splitBlock`

#### For Flow users
You can import the type of rules like 
```
// @flow
import {type typeDeleteAtRangeRule as typeRule } from 'slate-bind-copy-paste'
```

```
// @flow
import {type typeInsertFragmentAtRangeRule as typeRule } from 'slate-bind-copy-paste'
```

```
// @flow
import {type typeGetFragmentAtRangeRule as typeRule } from 'slate-bind-copy-paste'
```
