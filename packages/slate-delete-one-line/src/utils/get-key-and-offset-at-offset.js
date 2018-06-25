// @flow
import { type Block } from 'slate';

type Position = {
    key: string,
    offset: number
};

export default function getKeyAndOffsetAtOffset(
    block: Block,
    offset: number
): Position {
    const texts = block.getTexts();

    let text = texts.find(t => {
        if (t.text.length > offset) {
            return true;
        }

        offset -= t.text.length;
        return false;
    });

    if (!text) {
        text = texts.last();
        offset = text.text.length;
    }

    const { key } = text;
    return { key, offset };
}
