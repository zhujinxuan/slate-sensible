/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.setAlignAtRange(change, change.value.selection, 'center');
    return change;
}
export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td>
                        <anchor />Cat is Cute
                    </td>
                </tr>
            </table>
            <paragraph textAlign="left">Cat is Very Cute</paragraph>
            <ul>
                <li>
                    <paragraph>Cat is Cute</paragraph>
                </li>
            </ul>
            <table>
                <tr>
                    <td>Cell 1</td>
                    <td>Cell 2</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>Cell 3</td>
                    <td>
                        Cell 4<focus />
                    </td>
                </tr>
            </table>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <table textAlign="center">
                <tr>
                    <td textAlign="center">
                        <anchor />Cat is Cute
                    </td>
                </tr>
            </table>
            <paragraph textAlign="center">Cat is Very Cute</paragraph>
            <ul>
                <li>
                    <paragraph textAlign="center">Cat is Cute</paragraph>
                </li>
            </ul>
            <table textAlign="center">
                <tr>
                    <td textAlign="center">Cell 1</td>
                    <td textAlign="center">Cell 2</td>
                </tr>
            </table>
            <table textAlign="center">
                <tr>
                    <td textAlign="center">Cell 3</td>
                    <td textAlign="center">
                        Cell 4<focus />
                    </td>
                </tr>
            </table>
        </document>
    </value>
);
