/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    return change.normalize();
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
                <tr>No Columns Here</tr>
                <tr>
                    <td textAlign="left">Col 0, Row 2</td>
                    <td textAlign="left">Col 1, Row 2</td>
                    <td textAlign="left">Col 1, Row 3</td>
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
                    <td textAlign="left">Col 0, Row 0</td>
                    <td textAlign="left">Col 1, Row 0</td>
                    <td textAlign="left">Col 2, Row 0</td>
                </tr>
                <tr>
                    <td />
                    <td />
                    <td />
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 2</td>
                    <td textAlign="left">Col 1, Row 2</td>
                    <td textAlign="left">Col 1, Row 3</td>
                </tr>
            </table>
        </document>
    </value>
);
