/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    return plugin.changes.removeColumn(change);
}

export const input = (
    <value>
        <document>
            <table presetAlign={['left', 'left', 'left']}>
                <tr>
                    <td textAlign="left">Col 0, Row 0</td>
                    <td textAlign="left">Col 1, Row 0</td>
                    <td textAlign="left" />
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 1</td>
                    <td textAlign="left">Col 1, Row 1</td>
                    <td textAlign="left">
                        <cursor />
                    </td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 2</td>
                    <td textAlign="left">Col 1, Row 2</td>
                    <td textAlign="left" />
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left', 'left']}>
                <tr>
                    <td textAlign="left">Col 0, Row 0</td>
                    <td textAlign="left">Col 1, Row 0</td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 1</td>
                    <td textAlign="left">
                        Col 1, Row 1<cursor />
                    </td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 2</td>
                    <td textAlign="left">Col 1, Row 2</td>
                </tr>
            </table>
        </document>
    </value>
);
