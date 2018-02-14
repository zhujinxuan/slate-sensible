// @flow
import React, { type Node as ReactNode } from 'react';
import { type Value, type Change } from 'slate';
import MentionMenuContainer from './MentionMenuContainer';
import { InterfaceUpdater, type GetMentions } from '../type';

interface PropsInterface {
    value: Value;
    submitChange: Change => *;
}
function createMentionBundle(getMentions: GetMentions) {
    const updater: InterfaceUpdater = {
        isActive: () => false,
        next: () => null,
        previous: () => null,
        changeHOF: () => undefined
    };
    return {
        MentionMenu: (props: PropsInterface): ReactNode => {
            const { value, submitChange } = props;
            return (
                <MentionMenuContainer
                    {...{ updater, value, submitChange, getMentions }}
                />
            );
        },
        updater
    };
}

export default createMentionBundle;
