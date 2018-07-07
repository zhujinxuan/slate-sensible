/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    return plugin.changes.removeColumn(change);
}

export const input = (
    <value>
        <document>
            <table presetAlign={['left', 'center', 'right']}>
                <tr>
                    <td textAlign="left">Col 0, Row 0</td>
                    <td textAlign="center">
                        <cursor />
                        Col 1, Row 0
                    </td>
                    <td textAlign="right">Col 2, Row 0</td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 1</td>
                    <td textAlign="center">Col 1, Row 1</td>
                    <td textAlign="right">Col 2, Row 1</td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 2</td>
                    <td textAlign="center">Col 1, Row 2</td>
                    <td textAlign="right">Col 2, Row 2</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left', 'right']}>
                <tr>
                    <td textAlign="left">
                        Col 0, Row 0<cursor />
                    </td>
                    <td textAlign="right">Col 2, Row 0</td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 1</td>
                    <td textAlign="right">Col 2, Row 1</td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 2</td>
                    <td textAlign="right">Col 2, Row 2</td>
                </tr>
            </table>
        </document>
    </value>
);
