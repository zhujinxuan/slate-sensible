/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */
import h from '../h';

const fragment = (
    <document>
        <quote>
            <paragraph>Before</paragraph>
        </quote>
    </document>
);

export function runChange(plugin, change) {
    const { insertFragmentAtRange } = plugin.changes;
    return insertFragmentAtRange(change, change.value.selection, fragment);
}

export const input = (
    <value>
        <document>
            <image />
            <quote>
                <paragraph>After</paragraph>
            </quote>
            <paragraph>
                wo<cursor />rd
            </paragraph>
        </document>
    </value>
);
export const output = (
    <value>
        <document>
            <image />
            <quote>
                <paragraph>After</paragraph>
            </quote>
            <paragraph>
                woBefore<cursor />rd
            </paragraph>
        </document>
    </value>
);
