/** @jsx h */
import { Value } from 'slate';
import h from '../h';

export function runChange(plugin, change) {
    const fragment = plugin.utils.getFragmentAtRange(
        change.value.document,
        change.value.selection
    );
    return Value.fromJSON({ document: fragment }).change();
}
export const input = (
    <value>
        <document>
            <paragraph>Before</paragraph>
            <badTable>
                <badRow>
                    <badCell>
                        <paragraph>Before Text of First Bad Cell</paragraph>
                        <image key="g1">
                            {' '}
                            <anchor />
                        </image>
                        <paragraph key="g2">
                            After Text of First Bad Cell
                        </paragraph>
                    </badCell>
                    <badCell>
                        <image key="g3" />
                        <paragraph key="g4">Second Bad Cell</paragraph>
                    </badCell>
                </badRow>
            </badTable>
            <paragraph key="g5">
                After<focus /> Bad Cell
            </paragraph>
        </document>
    </value>
);
export const output = (
    <value>
        <document>
            <image key="g1" />
            <paragraph key="g2">After Text of First Bad Cell</paragraph>
            <image key="g3" />
            <paragraph key="g4">Second Bad Cell</paragraph>
            <paragraph key="g5">After</paragraph>
        </document>
    </value>
);
