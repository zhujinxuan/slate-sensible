/** @jsx h */
/* eslint-disable import/no-extraneous-dependencies */
import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        paragraph: 'paragraph'
    }
});

// eslint-disable-next-line no-template-curly-in-string
const content = '{$ User-id}, ${ User-cat}, {$ User-something }....';

const value = (
    <value>
        <document>
            <paragraph>
                This page is a basic example of Slate + slate-poor-mentions
                plugin
            </paragraph>
            <paragraph>{content}</paragraph>
            <paragraph>Plain Text....</paragraph>
        </document>
    </value>
);

export default value;
