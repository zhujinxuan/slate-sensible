/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    return change.normalize();
}

export const input = (
    <value>
        <document>
            <paragraph>Before</paragraph>
            <table>No Rows</table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <paragraph>Before</paragraph>
            <table presetAlign={['left']}>
                <tr>
                    <td />
                </tr>
            </table>
        </document>
    </value>
);
