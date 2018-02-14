// @flow
import { Mark } from 'slate';
import createMentionBundle from './components/createMentionBundle';
import createOnKeyDown from './createOnKeyDown';
import compileMentions from './compileMentions';
import createRenderMark from './createRenderMark';
import findMentionRange from './util/findMentionRange';

interface PluginImportOption {
    classNameForDecoration?: string;
    beforeMatchRegex?: RegExp;
    afterMatchRegex?: RegExp;
    beforeFormatMatcherRegex?: RegExp;
    afterFormatMatcherRegex?: RegExp;
    decorationMarkType?: string;
    mentions: Array<{ name: string }>;
}

function createMentionPlugin(options: PluginImportOption): Object {
    const { decorationMarkType = 'mention-decoration' } = options;
    const mentions = options.mentions.map(x => ({ name: x.name }));
    const decorationMark = Mark.create(decorationMarkType);
    const { classNameForDecoration = decorationMark.type } = options;
    const { beforeMatchRegex = /{ *\$[^{}\n]*$/ } = options;
    const { afterMatchRegex = /^[^{}\n]*}/ } = options;
    const { beforeFormatMatcherRegex = /^ *{ */ } = options;
    const { afterFormatMatcherRegex = / *} *$/ } = options;

    const getMentions = compileMentions(
        beforeMatchRegex,
        afterMatchRegex,
        beforeFormatMatcherRegex,
        afterFormatMatcherRegex,
        mentions
    );
    const { MentionMenu, updater } = createMentionBundle(getMentions);
    return {
        onKeyDown: createOnKeyDown(updater),
        portals: { MentionMenu },
        utils: {
            findMentionRange: findMentionRange(
                beforeMatchRegex,
                afterMatchRegex
            )
        },
        renderMark: createRenderMark(decorationMark, classNameForDecoration)
    };
}

export default createMentionPlugin;
