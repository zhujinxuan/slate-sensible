// @flow
import React, { type ComponentType } from 'react';
import { type Value, type Change } from 'slate';
import MentionMenuContainer from './MentionMenuContainer';
import {
    InterfaceUpdater,
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
    return {
        MentionMenu,
        updater
    };
}

export default createMentionBundle;
