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
                Cat is Cute<anchor />
                B
                <focus />
                fore
                <emoji />
            </paragraph>
            <paragraph>{''}</paragraph>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph>
                Cat is Cute<cursor />
                fore
                <emoji />
            </paragraph>
            <paragraph>{''}</paragraph>
        </document>
    </value>
);
