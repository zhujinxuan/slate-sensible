/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    return plugin.changes.removeTable(change);
}

export const input = (
    <value>
        <document>
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
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <paragraph>
                <cursor />
            </paragraph>
        </document>
    </value>
);
