/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.removeTable(change);
    return change;
}

export const input = (
    <value>
        <document>
            <badTable>
                <badRow>
                    <badCell>
                        <image />
                        <paragraph>
                            <cursor />1
                        </paragraph>
                    </badCell>
                    <badCell>
                        <paragraph>2</paragraph>
                    </badCell>
                </badRow>
            </badTable>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph>
                <cursor />
            </paragraph>
        </document>
    </value>
);
