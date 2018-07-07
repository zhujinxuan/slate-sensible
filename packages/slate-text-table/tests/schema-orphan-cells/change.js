/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    return change.normalize();
}

export const input = (
    <value>
        <document>
            <td>Col 0, Row 0</td>
            <td>Col 0, Row 1</td>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left']}>
                <tr>
                    <td>Col 0, Row 0</td>
                </tr>
            </table>
            <table presetAlign={['left']}>
                <tr>
                    <td>Col 0, Row 1</td>
                </tr>
            </table>
        </document>
    </value>
);
