import { createHyperscript } from 'slate-hyperscript';

/**
 * Define a hyperscript.
 *
 * @type {Function}
 */

const h = createHyperscript({
    blocks: {
        heading: 'heading',
        paragraph: 'paragraph',
        quote: 'quote',
        code: 'code',
        ul: 'ul_list',
        ol: 'ol_list',
        li: 'list_item',
        image: {
            type: 'image',
            isVoid: true
        },
        table: 'table',
        tr: 'table_row',
        td: 'table_cell'
    },
    inlines: {
        link: 'link',
        hashtag: 'hashtag',
        comment: 'comment',
        emoji: {
            type: 'emoji',
            isVoid: true
        }
    },
    marks: {
        b: 'bold',
        i: 'italic',
        u: 'underline'
    }
});

/**
 * Export.
 *
 * @type {Function}
 */

export default h;
