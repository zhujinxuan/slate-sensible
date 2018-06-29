/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.deleteAtRange(change, change.value.selection);
    return change;
}

export const input = (
    <value>
        <document>
            <paragraph>
                Cat is <anchor />Cute <focus />
            </paragraph>
        </document>
    </value>
);
export const output = (
    <value>
        <document>
            <paragraph>
                Cat is <cursor />
            </paragraph>
        </document>
    </value>
);
