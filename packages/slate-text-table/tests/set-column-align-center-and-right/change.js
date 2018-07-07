/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    change.focus();
    const { value } = change;
    const cursorBlock = value.document.getDescendant('_cursor_1');
    change.moveToRangeOf(cursorBlock);
    plugin.changes.setColumnAlign(change, 'center');

    const cursorBlock2 = value.document.getDescendant('_cursor_2');
    change.moveToRangeOf(cursorBlock2);
    return plugin.changes.setColumnAlign(change, 'right');
}

export const input = (
    <value>
        <document>
            <table presetAlign={['left', 'left']}>
                <tr>
                    <td key="_cursor_1">Col 0, Row 0</td>
                    <td key="_cursor_2">Col 1, Row 0</td>
                </tr>
                <tr>
                    <td>Col 0, Row 1</td>
                    <td>Col 1, Row 1</td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document>
            <table presetAlign={['center', 'right']}>
                <tr>
                    <td key="_cursor_1" textAlign="center">
                        Col 0, Row 0
                    </td>
                    <td key="_cursor_2" textAlign="right">
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
