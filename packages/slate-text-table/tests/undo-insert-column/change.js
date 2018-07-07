/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    plugin.changes.insertColumn(change);
    change.undo();
    return change;
}

export const input = (
    <value>
        <document>
            <table presetAlign={['left', 'left', 'left']}>
                <tr>
                    <td textAlign="left">Col 0, Row 0</td>
                    <td textAlign="left">Col 1, Row 0</td>
                    <td textAlign="left">Col 2, Row 0</td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 2</td>
                    <td textAlign="left">Col 1, Row 2</td>
                    <td textAlign="left">
                        <anchor />Col 2, Row 2<focus />
                    </td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 2</td>
                    <td textAlign="left">Col 1, Row 2</td>
                    <td textAlign="left">Col 2, Row 2</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = input;
