// @flow
import { Mark } from 'slate';
import createMentionBundle from './components/createMentionBundle';
import createOnKeyDown from './createOnKeyDown';
import compileMentions from './compileMentions';
import createRenderMark from './createRenderMark';
import createDecorateNode from './createDecorateNode';
import findMentionRangeCreator from './util/findMentionRange';
import getExtendedRangeCreator from './util/getExtendedRange';
import createOnChange from './createOnChangeDecoration';

interface PluginImportOption {
    classNameForDecoration?: string;
    classNameForCursorDecoration?: string;
    beforeMatchRegex?: RegExp;
    afterMatchRegex?: RegExp;
    beforeFormatMatcherRegex?: RegExp;
    afterFormatMatcherRegex?: RegExp;
    matchInBetweenRegex?: RegExp;
    decorationMarkType?: string | Mark;
    cursorDecorationMarkType?: string | Mark;
    mentions: Array<{ name: string }>;
}

function createMentionPlugin(options: PluginImportOption): Object {
    const { decorationMarkType = 'mention-decoration' } = options;
    const mentions = options.mentions.map(x => ({ name: x.name }));
    const decorationMark = Mark.create(decorationMarkType);
    const { classNameForDecoration = decorationMark.type } = options;
    const {
        cursorDecorationMarkType = `cursor-${decorationMark.type}`
    } = options;
    const cursorDecorationMark = Mark.create(cursorDecorationMarkType);
    const {
        classNameForCursorDecoration = cursorDecorationMark.type
    } = options;
    const { beforeMatchRegex = /{ *\$[^{}\n]*$/ } = options;
    const { afterMatchRegex = /^[^{}\n]*}/ } = options;
    const { beforeFormatMatcherRegex = /^ *{ */ } = options;
    const { afterFormatMatcherRegex = / *} *$/ } = options;
    const { matchInBetweenRegex = /{\$[^{}$]+}/g } = options;
    const findMentionRange = findMentionRangeCreator(
        beforeMatchRegex,
        afterMatchRegex
    );
    const getExtendedRange = getExtendedRangeCreator(
        mentions,
        beforeMatchRegex,
        afterMatchRegex
    );

    const getMentions = compileMentions(
        findMentionRange,
        beforeFormatMatcherRegex,
        afterFormatMatcherRegex,
        mentions
    );
    const { MentionMenu, updater } = createMentionBundle(getMentions);
    return {
        onKeyDown: createOnKeyDown(updater),
        portals: { MentionMenu },
        utils: {
            findMentionRange,
            getExtendedRange,
            isActive: updater.isActive
        },
        decorateNode: createDecorateNode(
            mentions,
            matchInBetweenRegex,
            decorationMark
        ),
        renderMark: createRenderMark(
            [decorationMark, cursorDecorationMark],
            [classNameForDecoration, classNameForCursorDecoration]
        ),
        onChange: createOnChange(
            findMentionRange,
            updater,
            beforeMatchRegex,
            cursorDecorationMark
        )
    };
}

export default createMentionPlugin;
