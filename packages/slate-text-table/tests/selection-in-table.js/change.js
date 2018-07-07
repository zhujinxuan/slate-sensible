/** @jsx h */

import h from '../h';

export default function(plugin, change) {
    expect(plugin.utils.isSelectionInTable(change.value)).toBe(true);
}

export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td>
                        <cursor />
                    </td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = undefined;
