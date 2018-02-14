// @flow
import { type Mark, type Node } from 'slate';

function createDecorateNode(
    mentions: Array<{ name: string }>,
    matchInBetween: RegExp,
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
            const text = t.text;
            let matched = matchInBetween.exec(text);

            while (matched) {
                if (names.indexOf(matched[0]) > -1) {
                    decorations.push({
                        anchorOffset: matched.index,
                        focusOffset: matched[0].length + matched.index,
                        focusKey: t.key,
                        anchorKey: t.key,
                        marks: [decoMark]
                    });
                }
                matched = matchInBetween.exec(text);
            }
        });
        return decorations;
    };
}
export default createDecorateNode;
