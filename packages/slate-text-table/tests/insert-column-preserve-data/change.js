/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    return plugin.changes.insertColumn(change);
}

export const input = (
    <value>
        <document>
            <table presetAlign={['center', 'center']}>
                <tr>
                    <td textAlign="center">Col 0, Row 0</td>
                    <td textAlign="center">Col 1, Row 0</td>
                </tr>
                <tr>
                    <td textAlign="center">
                        <anchor />Col 0, Row 1<focus />
                    </td>
                    <td textAlign="center">Col 1, Row 1</td>
                </tr>
                <tr>
                    <td textAlign="center">Col 0, Row 2</td>
                    <td textAlign="center">Col 1, Row 2</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['center', 'left', 'center']}>
                <tr>
                    <td textAlign="center">Col 0, Row 0</td>
                    <td textAlign="left" />
                    <td textAlign="center">Col 1, Row 0</td>
                </tr>
                <tr>
                    <td textAlign="center">Col 0, Row 1</td>
                    <td textAlign="left">
                        <cursor />
                    </td>
                    <td textAlign="center">Col 1, Row 1</td>
                </tr>
                <tr>
                    <td textAlign="center">Col 0, Row 2</td>
                    <td textAlign="left" />
                    <td textAlign="center">Col 1, Row 2</td>
                </tr>
            </table>
        </document>
    </value>
);
