/** @jsx h */

/* eslint-disable import/no-extraneous-dependencies */
import EditTable from 'slate-text-table';
import h from '../h';

export default function(prevPlugin, change) {
    const plugin = EditTable({ exitBlockType: null });
    return plugin.changes.removeTable(change);
}

export const input = (
    <value>
        <document>
            <table presetAlign={['left', 'left']}>
                <tr>
                    <td textAlign="left" />
                    <td textAlign="left" />
                </tr>
                <tr>
                    <td textAlign="left" />
                    <td textAlign="left">
                        <cursor />
                    </td>
                </tr>
            </table>
        </document>
    </value>
);

export const expected = (
    <value>
        <document />
    </value>
);
