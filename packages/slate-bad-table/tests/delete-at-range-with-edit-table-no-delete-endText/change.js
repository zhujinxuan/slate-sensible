/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.deleteAtRange(change, change.value.selection, {
        deleteEndText: false
    });
    return change;
}
export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td>Col0, Row0</td>
                    <td>Col1, Row0</td>
                    <td>Col2, Row0</td>
                </tr>
                <tr>
                    <td>
                        <cursor />Col0, Row1
                    </td>
                    <td>Col1, Row1</td>
                    <td>Col2, Row1</td>
                </tr>
                <tr>
                    <td>Col0, Row2</td>
                    <td>Col1, Row2</td>
                    <td>Col2, Row2</td>
                </tr>
            </table>
            <paragraph />
            <table>
                <tr>
                    <td>Col0, Row0</td>
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
                        Col2, Row2<focus />
                    </td>
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
                    <td>Col0, Row0</td>
                    <td>Col1, Row0</td>
                    <td>Col2, Row0</td>
                </tr>
                <tr>
                    <td>
                        <cursor />
                    </td>
                    <td />
                    <td />
                </tr>
            </table>
            <table>
                <tr>
                    <td />
                    <td />
                    <td>
                        <focus />
                    </td>
                </tr>
            </table>
        </document>
    </value>
);
