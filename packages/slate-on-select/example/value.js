/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable import/no-extraneous-dependencies */

import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        paragraph: 'paragraph'
    },
    inlines: {
        link: 'link'
    }
});

const value = (
    <value>
        <document>
            <paragraph>
                <text>
                    This page is a basic example of Slate + slate-on-select{' '}
                </text>
                <link>Cat</link>
                <text>!</text>
            </paragraph>
            <paragraph>Plain Text....</paragraph>
        </document>
    </value>
);

export default value;
