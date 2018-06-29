/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    return change.normalize();
}

export const input = (
    <value>
        <document>
            <badTable>
                <badRow>
                    <badCell>
                        <paragraph>
                            <cursor />Ebony is the cutest cat in the world
                        </paragraph>
                    </badCell>
                </badRow>
            </badTable>
            <paragraph />
            <badTable>
                <badRow>
                    <badCell>
                        <paragraph>
                            Cat is cute <emoji />
                        </paragraph>
                        <paragraph>Ebony is cute</paragraph>
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
                <cursor />Ebony is the cutest cat in the world
            </paragraph>
            <paragraph />
            <paragraph>
                Cat is cute <emoji />
            </paragraph>
            <paragraph>Ebony is cute</paragraph>
        </document>
    </value>
);
