/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

export function runChange(plugin, change) {
    const { deleteAtRange } = plugin;
    return deleteAtRange(change, change.value.selection);
}

export const input = (
    <value>
        <document>
            <paragraph>
                <comment>
                    Before
                    <link>
                        <anchor />
                        After Anchor
                    </link>
                    <link>Middle</link>
                    <link>
                        Focus
                        <focus />
                    </link>
                    After
                </comment>
            </paragraph>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph>
                <comment>
                    Before
                    <link>
                        <cursor />
                        {''}
                    </link>
                    After
                </comment>
            </paragraph>
        </document>
    </value>
);
