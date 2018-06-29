/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.deleteAtRange(change, change.value.selection);
    return change;
}

export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td>
                        <anchor />Col0, Row0
                    </td>
                    <td>Col1, Row0</td>
                    <td>Col2, Row0</td>
                </tr>
                <tr>
                    <td>Col0, Row1</td>
                    <td>Col1, Row1</td>
                    <td>Col2, Row1</td>
                </tr>
                <tr>
                    <td>Col0, Row2</td>
                    <td>Col1, Row2</td>
                    <td>
                        Col2, Row<focus />2
                    </td>
                </tr>
            </table>
            <paragraph />
        </document>
    </value>
);
export const output = (
    <value>
        <document>
            <table>
                <tr>
                    <td>
                        <anchor />
                    </td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <td />
                    <td />
                    <td>
                        <focus />2
                    </td>
                </tr>
            </table>
            <paragraph />
        </document>
    </value>
);
