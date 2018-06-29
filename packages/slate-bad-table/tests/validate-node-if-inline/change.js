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
            <table>
                <tr>
                    <td>
                        <cursor />Ebony is the cutest cat in the world
                    </td>
                    <td>
                        Cat is cute <emoji />
                        {'\n'}Ebony is cute
                    </td>
                </tr>
            </table>
        </document>
    </value>
);
