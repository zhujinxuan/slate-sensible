# slate-poor-mentions

Mentions plugin for SlateJS. You can have a try by pressing `@` at this repo [demo](https://zhujinxuan.github.io/slate-sensible/).

![slate-poor-mentions](https://user-images.githubusercontent.com/746159/42059094-5a7392b8-7af0-11e8-8a11-650043a0de86.png)

## Install

```
yarn add slate-poor-mentions
```

## Simple Usage

```javascript
import MentionsPlugin from "slate-poor-mentions";
const mentions = [{ name: "@ Tom" }, { name: "@ Jerry" }];
export default MentionsPlugin({ mentions } /* options */);
```

## Options

Consider a slate text like

```
 <paragraph> Here is $ To<cursor/>m </paragraph>
```

The plugin options are an object of

1.  `mentions : Array<{name: string}>` (necessary)

An array of mentions, in each mention object, a name property is necessary as the string for mention replacement.

2.  `beforeMatchRegex: RegExp` (optional)

The pattern matches the text between the mention triggering char and the cursor. In this case, it shall matches `$ To`
By default, this pattern will consider `{$` and `@` as mention triggering char.

3.  `afterMatchRegex: RegexExp` (optional)

The pattern matches the text between the cursor and mention ending char in text context. In this case, it shall matches

By default, this pattern will match `}`

4.  `getText: string => string` (optional)

Triming the mention triggering and ending chars to compare the editing text with mention texts.

By default, the getText will remove all chars not in alpha-beta and numbers in the double ends.

5.  `MentionItemChild: React.Component<Mention>` (optional)

By default, it is only `<span>{mention.name}</span>`

## Styling

### Containers

### Padding

By the relative position between selection and mention pop-up, the mention container `ul` is decorated by classes
`RichEditor-mention-position-top`, `RichEditor-mention-position-bottom`, `RichEditor-mention-position-left` and
`RichEditor-mention-position-right` respectively. If you always wants a `10px * 10 px` distance between selection
and mention pop up, you can

```css
.RichEditor-mention-position-top {
  margin-top: 10px;
}

.RichEditor-mention-position-bottom {
  margin-top: -10px;
}

.RichEditor-mention-position-left {
  margin-left: 10px;
}

.RichEditor-mention-position-right {
  margin-right: -10px;
}
```

## Why poor in package name?

Because all sensible names are taken in npm. :lol
