// @flow
import createMentionPlugin from 'slate-poor-mentions';
import mentions from '../constants/mentions';

const beforeMatchRegex = /{* *[$@] *[^{}\n]*$/;
const afterMatchRegex = /^[^{}\n]*}/;

export default createMentionPlugin({
    mentions,
    beforeMatchRegex,
    afterMatchRegex
});
