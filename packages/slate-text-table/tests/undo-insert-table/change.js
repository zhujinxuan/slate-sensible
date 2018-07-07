/** @jsx h */
import h from '../h';

export default function(plugin, change) {
    plugin.changes.insertTable(change);
    change.undo();
    return change;
}

export const input = (
    <value>
        <document>
            <paragraph>
                Before<cursor />
            </paragraph>
            <paragraph>After</paragraph>
        </document>
    </value>
);

export const expected = input;
