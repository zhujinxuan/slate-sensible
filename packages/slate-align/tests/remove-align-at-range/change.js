/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.removeAlignAtRange(change, change.value.selection, 'left');
    return change;
}
export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td textAlign="left">
                        Cat is <anchor />cute
                    </td>
                </tr>
            </table>
            <paragraph textAlign="center">Cat is Very Cute</paragraph>
            <ul>
                <li>
                    <paragraph textAlign="left">Cat is Cute</paragraph>
                </li>
            </ul>
            <table textAlign="center">
                <tr>
                    <td textAlign="center">Cell 1</td>
                    <td textAlign="left">Cell 2</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td textAlign="left">
                        Cell <focus />3
                    </td>
                    <td>Cell 4</td>
                </tr>
            </table>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <table>
                <tr>
                    <td>
                        Cat is <anchor />cute
                    </td>
                </tr>
            </table>
            <paragraph textAlign="center">Cat is Very Cute</paragraph>
            <ul>
                <li>
                    <paragraph>Cat is Cute</paragraph>
                </li>
            </ul>
            <table textAlign="center">
                <tr>
                    <td textAlign="center">Cell 1</td>
                    <td>Cell 2</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        Cell <focus />3
                    </td>
                    <td>Cell 4</td>
                </tr>
            </table>
        </document>
    </value>
);
