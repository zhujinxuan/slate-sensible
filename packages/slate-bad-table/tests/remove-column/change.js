/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    plugin.changes.removeColumn(change);
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

const outputA = (
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
                            <cursor />Col2, Row0
                        </paragraph>
                    </badCell>
                </badRow>
                <badRow>
                    <badCell>
                        <image />
                        <paragraph>Col0, Row1</paragraph>
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

export const output = outputA.change().call(change => {
    const { startBlock } = change.value;
    const prevBlock = change.value.document.getPreviousBlock(startBlock.key);
    change.collapseToStartOf(prevBlock);
    return change;
}).value;
