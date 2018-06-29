/** @jsx h */

import h from '../h';

const runChange = function(plugin, change) {
    const { deleteAtRange } = plugin;
    return deleteAtRange(change, change.value.selection);
};
const input = (
    <value>
        <document>
            <paragraph>
                <comment>
                    Before
                    <hashtag>
                        <anchor />just a inline
                    </hashtag>
                    After Anchor Middle
                    <hashtag>
                        Focus<focus />
                    </hashtag>
                    After
                </comment>
            </paragraph>
        </document>
    </value>
);
const output = (
    <value>
        <document>
            <paragraph>
                <comment>
                    Before
                    <hashtag>
                        <cursor />
                    </hashtag>
                    After
                </comment>
            </paragraph>
        </document>
    </value>
);
export { input, output, runChange };
