// @flow

const tagTextAlign = ['div', 'p', 'h1', 'h2', 'h3', 'ul', 'ol', 'td'];
const tagFloat = ['div', 'p', 'h1', 'h2', 'h3', 'img'];
const tagNames = [...tagTextAlign, ...tagFloat];
const alignments = ['left', 'center', 'right'];

function getData(el: HTMLElement): { textAlign?: string } {
    if (tagNames.indexOf(el.tagName.toLowerCase()) === -1) {
        return {};
    }

    if (el.style && typeof el.style.textAlign === 'string') {
        const align: string = el.style.textAlign;
        if (align && alignments.indexOf(align) > -1) {
            return { textAlign: align };
        }
    }

    if (el.getAttribute('align')) {
        const align: ?string = el.getAttribute('align');
        if (align && alignments.indexOf(align) > -1) {
            return { textAlign: align };
        }
    }

    if (
        el.style &&
        typeof el.style.float === 'string' &&
        el.style.float !== 'clear'
    ) {
        const align: string = el.style.float;
        if (align && alignments.indexOf(align) > -1) {
            return { textAlign: align };
        }
    }
    return {};
}

export default getData;
