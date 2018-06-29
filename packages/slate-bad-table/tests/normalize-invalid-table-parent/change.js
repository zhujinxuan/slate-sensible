/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    return change.normalize();
}

export const input = (
    <value>
        <document>
            <block type="bigP">
                <badTable>
                    <badRow>
                        <badCell>
                            <paragraph>
                                Ebony is cutest cat in the world
                            </paragraph>
                            <image />
                        </badCell>
                        <badCell>
                            <paragraph>Cat is cute</paragraph>
                        </badCell>
                    </badRow>
                </badTable>
            </block>
        </document>
    </value>
);
export const output = (
    <value>
        <document>
            <block type="bigP">
                <paragraph>Ebony is cutest cat in the world</paragraph>
                <image />
                <paragraph>Cat is cute</paragraph>
            </block>
        </document>
    </value>
);
