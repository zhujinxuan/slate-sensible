/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */
import h from '../h';

const fragment = (
    <document>
        <table>
            <tr>
                <td>Before</td>
                <td>Before Two</td>
            </tr>
        </table>
    </document>
);
export function runChange(plugin, change) {
    const { insertFragmentAtRange } = plugin;
    return insertFragmentAtRange(change, change.value.selection, fragment);
}

export const input = (
    <value>
        <document>
            <image />
            <image />
            <paragraph>
                <cursor />word
            </paragraph>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <image />
            <image />
            <table>
                <tr>
                    <td>Before</td>
                    <td>
                        Before Two<cursor />
                    </td>
                </tr>
            </table>
            <paragraph>word</paragraph>
        </document>
    </value>
);
