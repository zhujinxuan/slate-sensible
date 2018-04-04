// @flow
import { Mark } from 'slate';
import React from 'react';
import createMentionBundle from './components/createMentionBundle';
import createOnKeyDown from './createOnKeyDown';
import compileMentions from './compileMentions';
import createRenderMark from './createRenderMark';
import createDecorateNode from './createDecorateNode';
import findMentionRangeCreator from './util/findMentionRange';
import getExtendedRangeCreator from './util/getExtendedRange';
import createOnChange from './createOnChangeDecoration';
import { type MentionItemChildType } from './type';

interface PluginImportOption<T: { name: string }> {
    classNameForDecoration?: string;
    classNameForCursorDecoration?: string;
    beforeMatchRegex?: RegExp;
    afterMatchRegex?: RegExp;
    decorationMarkType?: string | Mark;
    cursorDecorationMarkType?: string | Mark;
    MentionItemChild?: MentionItemChildType<T>;
    mentions: Array<T>;
    getText?: string => string;
    matcher?: (string, T) => *;
}

function createMentionPlugin<T: { name: string }>(
    options: PluginImportOption<T>
): Object {
    const { decorationMarkType = 'mention-decoration' } = options;
    const mentions = options.mentions.filter(m => m.name);
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

    const {
        MentionItemChild = (props: { mention: T, text: string }) => {
            const { name } = props.mention;
            const { text } = props;
            const index = text ? name.indexOf(text) : -1;
            if (index === -1) {
                return <span>{props.mention.name}</span>;
            }
            const prefixText = name.slice(0, index);
            const afterText = name.slice(index + text.length);
            return (
                <span>
                    {prefixText}
                    <span className={'mention-matched-text'}>{text}</span>
                    {afterText}
                </span>
            );
        }
    } = options;
    const findMentionRange = findMentionRangeCreator(
        beforeMatchRegex,
        afterMatchRegex
    );
    const getExtendedRange = getExtendedRangeCreator(
        mentions,
        beforeMatchRegex,
        afterMatchRegex
    );
    const {
        matcher = (text, mention) =>
            mention.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
    } = options;
    const {
        getText = (x: string) =>
            x.replace(/^[^A-Z0-9a-z]+/, '').replace(/[^A-Z0-9a-z]+$/, '')
    } = options;

    const getMentions = compileMentions(
        findMentionRange,
        getText,
        mentions,
        matcher
    );
    const { renderEditor, updater } = createMentionBundle(
        getMentions,
        MentionItemChild
    );

    return {
        onKeyDown: createOnKeyDown(updater),
        renderEditor,
        utils: {
            findMentionRange,
            getExtendedRange,
            isActive: updater.isActive
        },
        decorateNode: createDecorateNode(mentions, decorationMark),
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
