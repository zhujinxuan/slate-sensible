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
                                <badCell>
                                    <paragraph>Ebony is a cat</paragraph>
                                </badCell>
                            </badRow>
                        </badTable>
                    </badCell>
                    <badCell>
                        <badTable>
                            <badRow>
                                <badCell>
                                    <image />
                                    <paragraph />
                                </badCell>
                            </badRow>
                        </badTable>
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
                        <image />
                        <paragraph>Ebony is a cat</paragraph>
                    </badCell>
                    <badCell>
                        <image />
                        <paragraph />
                    </badCell>
                </badRow>
            </badTable>
        </document>
    </value>
);
