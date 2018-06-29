/** @jsx h */
import h from '../h';

const fragment = (
    <value>
        <document>
            <table>
                <tr>
                    <td>Col 0, Row0</td>
                    <td>Col 1, Row0</td>
                    <td>Col 2, Row0</td>
                </tr>
                <tr>
                    <td>Col 0, Row1</td>
                    <td>Col 1, Row1</td>
                    <td>Col 2, Row1</td>
                </tr>
                <tr>
                    <td>Col 0, Row2</td>
                    <td>Col 1, Row2</td>
                    <td>Col 2, Row2</td>
                </tr>
                <tr>
                    <td>Col 0, Row3</td>
                    <td>Col 1, Row3</td>
                    <td>Col 2, Row3</td>
                </tr>
            </table>
        </document>
    </value>
)
    .change()
    .normalize().value.document;
export function runChange(plugin, change) {
    plugin.changes.insertFragmentAtRange(
        change,
        change.value.selection,
        fragment
    );
    return change;
}

export const input = (
    <value>
        <document>
            <paragraph>
                Cat is <cursor />Cute
            </paragraph>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph>Cat is </paragraph>
            <table>
                <tr>
                    <td>Col 0, Row0</td>
                    <td>Col 1, Row0</td>
                    <td>Col 2, Row0</td>
                </tr>
                <tr>
                    <td>Col 0, Row1</td>
                    <td>Col 1, Row1</td>
                    <td>Col 2, Row1</td>
                </tr>
                <tr>
                    <td>Col 0, Row2</td>
                    <td>Col 1, Row2</td>
                    <td>Col 2, Row2</td>
                </tr>
                <tr>
                    <td>Col 0, Row3</td>
                    <td>Col 1, Row3</td>
                    <td>
                        Col 2, Row3<cursor />
                    </td>
                </tr>
            </table>
            <paragraph>Cute</paragraph>
        </document>
    </value>
);
