/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    expect(plugin.utils.isSelectionInTable(change.value)).toBe(false);
}

export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td>
                        <anchor />
                    </td>
                </tr>
            </table>
            <paragraph>
                <focus />
            </paragraph>
        </document>
    </value>
);

export const expected = undefined;
