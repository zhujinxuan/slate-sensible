# slate-poor-mentions

Mentions plugin for SlateJS.

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

1.  `mentions : Array<{name: string}>`, the name property is the string for mention replacement.

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
