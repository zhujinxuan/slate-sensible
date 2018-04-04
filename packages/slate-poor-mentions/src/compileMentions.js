// @flow
import { type Value, type Range } from 'slate';
import { type GetMentions } from './type';

function compileMentions<T: { name: string }>(
    findMentionRange: Value => null | Range,
    getText: string => string,
    mentions: Array<T>,
    matcher: (string, T) => *
): GetMentions<T> {
    const getMentions = (text: string) =>
        mentions.filter(m => matcher(text, m));
    return (value: Value) => {
        const range = findMentionRange(value);

        if (!range) {
            return {
                text: '',
                range: null,
                mentions: []
            };
        }

        const textNode = value.document.getDescendant(range.focusKey);

        const text = getText(
            textNode.text.substring(
                range.startOffset,
                value.selection.focusOffset
            )
        );

        return {
            text,
            range,
            mentions: getMentions(text)
        };
    };
}

export default compileMentions;
