// @flow
import React, { type ComponentType } from 'react';
import { type Value, type Change, type Editor } from 'slate';
import MentionMenuContainer from './MentionMenuContainer';
import {
    type InterfaceUpdater,
    type GetMentions,
    type MentionItemChildType
} from '../type';

interface PropsInterface {
    value: Value;
    submitChange: Change => *;
}

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
    const MentionMenu: ComponentType<PropsInterface> = (
        props: PropsInterface
    ) => {
        const { value, submitChange } = props;
        return (
            <MentionMenuContainer
                {...{
                    updater,
                    value,
                    submitChange,
                    getMentions,
                    MentionItemChild
                }}
            />
        );
    };
    const renderEditor = (props: Object, editor: Editor) => (
        <div>
            {props.children}
            <MentionMenu value={editor.value} submitChange={editor.change} />
        </div>
    );
    return {
        MentionMenu,
        renderEditor,
        updater
    };
}

export default createMentionBundle;
