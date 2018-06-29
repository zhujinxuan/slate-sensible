/** @jsx h */
import { Value } from 'slate';
import h from '../h';

export function runChange(plugin, change) {
    const fragment = plugin.utils.getFragmentAtRange(
        change.value.document,
        change.value.selection
    );
    return Value.fromJSON({ document: fragment }).change();
}
export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td>Col0, Row0</td>
                    <td>
                        Col1, <anchor />Row0
                    </td>
                    <td>Col2, Row0</td>
                </tr>
                <tr>
                    <td>Col0, Row1</td>
                    <td>Col1, Row1</td>
                    <td>Col2, Row1</td>
                </tr>
                <tr>
                    <td>
                        Col0, <focus />Row2
                    </td>
                    <td>Col1, Row2</td>
                    <td>Col2, Row2</td>
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
                    <td />
                    <td>Row0</td>
                    <td>Col2, Row0</td>
                </tr>
                <tr>
                    <td>Col0, Row1</td>
                    <td>Col1, Row1</td>
                    <td>Col2, Row1</td>
                </tr>
                <tr>
                    <td>Col0, </td>
                    <td />
                    <td />
                </tr>
            </table>
        </document>
    </value>
);
