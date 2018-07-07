/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    return plugin.changes.removeRow(change);
}

export const input = (
    <value>
        <document>
            <table presetAlign={['left', 'left', 'left']}>
                <tr>
                    <td textAlign="left">Col 0, Row 0</td>
                    <td textAlign="left">
                        <cursor />Col 1, Row 0
                    </td>
                    <td textAlign="left">Col 2, Row 0</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left', 'left', 'left']}>
                <tr>
                    <td textAlign="left">
                        <cursor />
                    </td>
                    <td textAlign="left" />
                    <td textAlign="left" />
                </tr>
            </table>
        </document>
    </value>
);
