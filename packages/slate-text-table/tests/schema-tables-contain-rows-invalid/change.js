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
                    <td>Row 0, Col 0</td>
                </tr>
                <paragraph>
                    <td>Row 0, Col 1</td>
                </paragraph>
                <tr>
                    <td>Row 0, Col 2</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left']}>
                <tr>
                    <td>Row 0, Col 0</td>
                </tr>
                <tr>
                    <td>Row 0, Col 2</td>
                </tr>
            </table>
        </document>
    </value>
);
