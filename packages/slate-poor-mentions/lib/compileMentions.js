// @flow
import findMentionRangeCreator from './util/findMentionRange';
import { type GetMentions } from './type';

function formatForMatcher(
    beforeFormat: RegExp,
    afterFormat: RegExp,
    cursorText: string
): string {
    return cursorText
        .replace(beforeFormat, '')
        .replace(afterFormat, '')
        .toLowerCase();
}

// edit-distance plugin for future development
// @return {Function: string=>Array(Object)}
function compileStringArrays(
    beforeFormatMatcherRegex,
    afterFormatMatcherRegex,
    mentions: Array<{ name: string }>
) {
    const formattedMentions = mentions.map(mention => ({
        ...mention,
        text: formatForMatcher(
            beforeFormatMatcherRegex,
            afterFormatMatcherRegex,
            mention.name
        )
    }));
    return (text: string): Array<{ text: string, name: string }> =>
        formattedMentions.filter(mention => text === mention.text);
}

function compileMentions(
    beforeMatchRegex: RegExp,
    afterMatchRegex: RegExp,
    beforeFormatMatcherRegex: RegExp,
    afterFormatMatcherRegex: RegExp,
    mentions: Array<{ name: string }>
): GetMentions {
    const mentionsStringArray = mentions.filter(
        mention => typeof mention.name === 'string'
    );
    const getMentions = compileStringArrays(
        beforeFormatMatcherRegex,
        afterFormatMatcherRegex,
        mentionsStringArray
    );
    return value => {
        const range = findMentionRangeCreator(
            beforeMatchRegex,
            afterMatchRegex
        )(value);

        if (!range) {
            return {
                text: null,
                range: null,
                mentions: []
            };
        }

        const textNode = value.document.getDescendant(range.focusKey);

        const text = formatForMatcher(
            beforeFormatMatcherRegex,
            afterFormatMatcherRegex,
            textNode.text.substring(
                range.anchorOffset,
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
