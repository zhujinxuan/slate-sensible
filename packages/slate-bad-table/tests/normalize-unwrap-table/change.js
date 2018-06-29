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
                        <badTable>
                            <badRow>
                                <badCell>
                                    <image />
                                </badCell>
                            </badRow>
                            <badRow>
                                <badCell>
                                    <paragraph>Ebony is a cat</paragraph>
                                </badCell>
                            </badRow>
                        </badTable>
                    </badCell>
                </badRow>
            </badTable>
            <paragraph />
        </document>
    </value>
);
export const output = (
    <value>
        <document>
            <image />
            <paragraph>Ebony is a cat</paragraph>
            <paragraph />
        </document>
    </value>
);
