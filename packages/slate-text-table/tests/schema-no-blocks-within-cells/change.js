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
                    <td textAlign="left">
                        <paragraph>Col 0, Row 0</paragraph>
                        <paragraph>Extra Text</paragraph>
                    </td>
                    <td textAlign="left">
                        <inline type="link">Col 1, Row 0</inline>
                    </td>
                    <td textAlign="left">Col 2, Row 0</td>
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
                    <td textAlign="left">Col 0, Row 0Extra Text</td>
                    <td textAlign="left">
                        <inline type="link">Col 1, Row 0</inline>
                    </td>
                    <td textAlign="left">Col 2, Row 0</td>
                </tr>
            </table>
        </document>
    </value>
);
