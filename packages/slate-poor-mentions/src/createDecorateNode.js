// @flow
import { type Mark, type Node } from 'slate';

function createDecorateNode<T: { name: string }>(
    mentions: Array<T>,
    decoMark: Mark
) {
    return (
        node: Node
    ): null | Array<{
        anchorOffset: number,
        focusOffset: number,
        focusKey: string,
        anchorKey: string,
        marks: Array<Mark>
    }> => {
        const names = mentions.map(x => x.name);
        if (node.object !== 'block') return null;
        if (!node.isLeafBlock()) return null;
        const texts = node.getTexts();
        const decorations = [];
        texts.forEach(t => {
            const { text } = t;
            // We can use common prefix and lastIndexOf if necessary
            names.forEach(name => {
                let index = text.indexOf(name, 0);
                while (index !== -1) {
                    decorations.push({
                        anchorOffset: index,
                        focusOffset: index + name.length,
                        focusKey: t.key,
                        anchorKey: t.key,
                        marks: [decoMark]
                    });
                    index = text.indexOf(name, index + name.length);
                }
            });
        });
        return decorations;
    };
}
export default createDecorateNode;
