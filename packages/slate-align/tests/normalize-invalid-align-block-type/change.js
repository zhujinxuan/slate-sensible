/** @jsx h */
import h from '../h';

export function runChange(plugin, change) {
    change.normalize();
    return change;
}
export const input = (
    <value>
        <document>
            <heading>Cat is Cute</heading>
            <paragraph textAlign="left">Cat is Very Cute</paragraph>
            <ul textAlign="left">
                <li>
                    <paragraph>Cat is Cute</paragraph>
                </li>
            </ul>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <heading>Cat is Cute</heading>
            <paragraph textAlign="left">Cat is Very Cute</paragraph>
            <ul>
                <li>
                    <paragraph>Cat is Cute</paragraph>
                </li>
            </ul>
        </document>
    </value>
);
