# slate-better-soft-break

Improve `slate-soft-break` with `validateNode` with features:
1. Break '\n' in blocks disallowing soft-break
2. Break '\n' in inlines

## Usage
```
yarn add slate-better-soft-break
```

```
import createSoftBreakPlugin from '../../lib/';
const plugin = createSoftBreakPlugin({
    softBreakIn: ['code', 'cell']
});
```
Options: 
1. `softBreakIn: Array<string>` block types allowing the soft-break
2. `shiftIn: Array<string>` (optional) blocks types that enter soft-break with shift+enter
3. `ignoreWhen(Event, Value) : boolean`: To ignore the `onKeyDown` function provided by this plugin
4. `deleteAtRange()`(optional): You customized deleteAtRange for insert '\n';
