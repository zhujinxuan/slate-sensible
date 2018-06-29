/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.deleteAtRange(change, change.value.selection);
    return change;
}
export const input = (
    <value>
        <document>
            <badTable>
                <badRow>
                    <badCell>
                        <paragraph>
                            Table1: Before Text of First Bad Cell
                        </paragraph>
                        <image />
                        <paragraph>After Text of First Bad Cell</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>
                            <cursor />Second Bad Cell
                        </paragraph>
                    </badCell>
                </badRow>
            </badTable>
            <paragraph>After</paragraph>
            <badTable>
                <badRow>
                    <badCell>
                        <image />
                        <paragraph>After First Bad Cell</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>
                            <focus />Table 2: Second Bad Cell
                        </paragraph>
                    </badCell>
                </badRow>
            </badTable>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <badTable>
                <badRow>
                    <badCell>
                        <paragraph>
                            Table1: Before Text of First Bad Cell
                        </paragraph>
                        <image />
                        <paragraph>After Text of First Bad Cell</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>
                            <anchor />
                        </paragraph>
                    </badCell>
                </badRow>
            </badTable>
            <paragraph>
                <focus />Table 2: Second Bad Cell
            </paragraph>
        </document>
    </value>
);
