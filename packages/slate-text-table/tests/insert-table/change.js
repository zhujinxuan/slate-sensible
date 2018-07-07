/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    return plugin.changes.insertTable(change);
}

export const input = (
    <value>
        <document>
            <paragraph>
                Before<cursor />After
            </paragraph>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <paragraph>Before</paragraph>
            <table presetAlign={['left', 'left']}>
                <tr>
                    <td textAlign="left" />
                    <td textAlign="left" />
                </tr>
                <tr>
                    <td textAlign="left" />
                    <td textAlign="left">
                        <cursor />
                    </td>
                </tr>
            </table>
            <paragraph>After</paragraph>
        </document>
    </value>
);
