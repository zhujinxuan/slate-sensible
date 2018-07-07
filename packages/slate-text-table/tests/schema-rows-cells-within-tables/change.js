/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    return change.normalize();
}

export const input = (
    <value>
        <document>
            <tr>No Table</tr>
            <td>No Row</td>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left']}>
                <tr>No Table</tr>
            </table>
            <table presetAlign={['left']}>
                <tr>
                    <td>No Row</td>
                </tr>
            </table>
        </document>
    </value>
);
