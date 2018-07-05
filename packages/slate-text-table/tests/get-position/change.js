/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    const { value } = change;
    const position = plugin.utils.getPosition(value);

    expect(position.getWidth()).toEqual(3);
    expect(position.getHeight()).toEqual(3);
    expect(position.getRowIndex()).toEqual(1);
    expect(position.getColumnIndex()).toEqual(0);

    return value;
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
                        <anchor />Col 0, Row 1<focus />
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

export const expected = undefined;
