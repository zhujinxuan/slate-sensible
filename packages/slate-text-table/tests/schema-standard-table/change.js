/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    return change.normalize();
}

export const input = (
    <value>
        <document>
            <table>
                <tr>
                    <td>Col 0, Row 0</td>
                    <td>Col 1, Row 0</td>
                    <td>Col 2, Row 0</td>
                </tr>
                <tr>
                    <td>Col 0, Row 0</td>
                    <td>Col 1, Row 0</td>
                    <td>Col 2, Row 0</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left', 'left', 'left']}>
                <tr>
                    <td>Col 0, Row 0</td>
                    <td>Col 1, Row 0</td>
                    <td>Col 2, Row 0</td>
                </tr>
                <tr>
                    <td>Col 0, Row 0</td>
                    <td>Col 1, Row 0</td>
                    <td>Col 2, Row 0</td>
                </tr>
            </table>
        </document>
    </value>
);
