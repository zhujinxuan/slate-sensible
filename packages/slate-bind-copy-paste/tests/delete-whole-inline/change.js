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
                        <focus />cursor<anchor />
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
