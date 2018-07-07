/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    return plugin.changes.setColumnAlign(change, 'left', 0);
}

export const input = (
    <value>
        <document>
            <table presetAlign={['center', 'right']}>
                <tr>
                    <td textAlign="center">Col 0, Row 0</td>
                    <td textAlign="right">
                        <anchor />Col 1, Row 0<focus />
                    </td>
                </tr>
                <tr>
                    <td textAlign="center">Col 0, Row 1</td>
                    <td textAlign="right">Col 1, Row 1</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['left', 'right']}>
                <tr>
                    <td textAlign="left">Col 0, Row 0</td>
                    <td textAlign="right">
                        <anchor />Col 1, Row 0<focus />
                    </td>
                </tr>
                <tr>
                    <td textAlign="left">Col 0, Row 1</td>
                    <td textAlign="right">Col 1, Row 1</td>
                </tr>
            </table>
        </document>
    </value>
);
