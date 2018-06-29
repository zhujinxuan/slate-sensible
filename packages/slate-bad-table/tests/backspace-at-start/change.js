/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.onKeyDown({ key: 'Backspace', which: 8 }, change);
    return change;
}
export const input = (
    <value>
        <document>
            <badTable>
                <badRow>
                    <badCell>
                        <paragraph>Col 0, Row 0</paragraph>
                    </badCell>
                    <badCell>
                        <paragraph>Col 1, Row 0</paragraph>
                    </badCell>
                </badRow>

                <badRow>
                    <badCell>
                        <paragraph>
                            <cursor />
                            Col 0, Row 1
                        </paragraph>
                    </badCell>
                    <badCell>
                        <paragraph>Col 1, Row 2</paragraph>
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
                        <paragraph>Col 0, Row 0</paragraph>
                    </badCell>
                    <badCell>
                        <paragraph>
                            Col 1, Row 0
                            <cursor />
                        </paragraph>
                    </badCell>
                </badRow>

                <badRow>
                    <badCell>
                        <paragraph>Col 0, Row 1</paragraph>
                    </badCell>
                    <badCell>
                        <paragraph>Col 1, Row 2</paragraph>
                    </badCell>
                </badRow>
            </badTable>
        </document>
    </value>
);
