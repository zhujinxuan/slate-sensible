// @flow
import React from 'react';
import { type Editor } from 'slate';
import MentionMenuContainer from './MentionMenuContainer';
import {
    type InterfaceUpdater,
    type GetMentions,
    type MentionItemChildType
} from '../type';

function createMentionBundle<T: { name: string }>(
    getMentions: GetMentions<T>,
    MentionItemChild: MentionItemChildType<T>
) {
    const updater: InterfaceUpdater = {
        isActive: () => false,
        next: () => null,
        previous: () => null,
        changeHOF: () => undefined
    };
    const renderEditor = (props: Object, editor: Editor) => {
        const { value } = editor;
        const submitChange = editor.change;
        return (
            <div>
                {props.children}
                <MentionMenuContainer
                    {...{
                        updater,
                        value,
                        submitChange,
                        getMentions,
                        MentionItemChild
                    }}
                />
            </div>
        );
    };
    return {
        renderEditor,
        updater
    };
}

export default createMentionBundle;
