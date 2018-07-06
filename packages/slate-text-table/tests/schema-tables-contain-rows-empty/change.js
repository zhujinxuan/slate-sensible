/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    return change.normalize();
}

export const input = (
    <value>
        <document>
            <table>No Rows</table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left']}>
                <tr>
                    <td />
                </tr>
            </table>
        </document>
    </value>
);
