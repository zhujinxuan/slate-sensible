// @flow
import React, { type ComponentType, type Element } from 'react';
import { type Value, type Change } from 'slate';
import MentionMenuContainer from './MentionMenuContainer';
import { InterfaceUpdater, type GetMentions, type Mention } from '../type';

interface PropsInterface {
    value: Value;
    submitChange: Change => *;
}

function createMentionBundle(
    getMentions: GetMentions,
    MentionItemChild: ?ComponentType<Mention>
) {
    const updater: InterfaceUpdater = {
        isActive: () => false,
        next: () => null,
        previous: () => null,
        changeHOF: () => undefined
    };
    const MentionMenu = (
        props: PropsInterface
    ): Element<typeof MentionMenuContainer> => {
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
