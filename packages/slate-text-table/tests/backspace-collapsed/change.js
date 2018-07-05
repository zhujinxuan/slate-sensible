/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );

    return change;
}

export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td>Col 0, Row 0</td>
                    <td>Col 1, Row 0</td>
                    <td>Col 2, Row 0</td>
                </tr>
                <tr>
                    <td>
                        <cursor />Col 0, Row 1
                    </td>
                    <td>Col 1, Row 1</td>
                    <td>Col 2, Row 1</td>
                </tr>
                <tr>
                    <td>Col 0, Row 2</td>
                    <td>Col 1, Row 2</td>
                    <td>Col 2, Row 2</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table>
                <tr>
                    <td>Col 0, Row 0</td>
                    <td>Col 1, Row 0</td>
                    <td>Col 2, Row 0</td>
                </tr>
                <tr>
                    <td>
                        <cursor />Col 0, Row 1
                    </td>
                    <td>Col 1, Row 1</td>
                    <td>Col 2, Row 1</td>
                </tr>
                <tr>
                    <td>Col 0, Row 2</td>
                    <td>Col 1, Row 2</td>
                    <td>Col 2, Row 2</td>
                </tr>
            </table>
        </document>
    </value>
);
