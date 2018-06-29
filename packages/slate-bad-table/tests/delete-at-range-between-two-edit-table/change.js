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
                        <anchor />
                        Col 0, Row 0 <emoji />
                    </td>
                    <td>
                        Col 1, Row 0 <emoji />
                    </td>
                    <td>
                        Col 2, Row 0 <emoji />
                    </td>
                </tr>
                <tr>
                    <td>
                        Col 0, Row 1 <emoji />
                    </td>
                    <td>
                        Col 1, Row 1 <emoji />
                    </td>
                    <td>
                        Col 2, Row 1 <emoji />
                    </td>
                </tr>
                <tr>
                    <td>
                        Col 0, Row 2 <emoji />
                    </td>
                    <td>
                        Col 1, Row 2 <emoji />
                    </td>
                    <td>
                        Col 2, Row 2 <emoji />
                    </td>
                </tr>
            </table>
            <paragraph>{''}</paragraph>
            <table>
                <tr>
                    <td>
                        Col 0, Row 0 <emoji />
                    </td>
                    <td>
                        Col 1, Row 0 <emoji />
                    </td>
                    <td>
                        Col 2, Row 0 <emoji />
                    </td>
                </tr>
                <tr>
                    <td>
                        Col 0, Row 1 <emoji />
                    </td>
                    <td>
                        Col 1, Row 1 <emoji />
                    </td>
                    <td>
                        Col 2, Row 1 <emoji />
                    </td>
                </tr>
                <tr>
                    <td>
                        Col 0, Row 2 <emoji />
                    </td>
                    <td>
                        Col 1, Row 2 <emoji />
                    </td>
                    <td>
                        Col 2, Row 2 <emoji />
                        <focus />
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
                    <td>
                        <focus />
                    </td>
                </tr>
            </table>
            <paragraph />
        </document>
    </value>
);
