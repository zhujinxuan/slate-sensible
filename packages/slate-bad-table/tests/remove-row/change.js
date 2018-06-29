/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.removeRow(change);
    return change;
}
export const input = (
    <value>
        <document>
            <badTable>
                <badRow>
                    <badCell>
                        <image />
                        <paragraph>Col0, Row0</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>
                            <anchor />Col1, Row0 <focus />
                        </paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>Col2, Row0</paragraph>
                    </badCell>
                </badRow>
                <badRow>
                    <badCell>
                        <image />
                        <paragraph>Col0, Row1</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>Col1, Row1</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>Col2, Row1</paragraph>
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
                        <image>
                            <cursor />
                        </image>
                        <paragraph>Col0, Row1</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>Col1, Row1</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph>Col2, Row1</paragraph>
                    </badCell>
                </badRow>
            </badTable>
        </document>
    </value>
);
