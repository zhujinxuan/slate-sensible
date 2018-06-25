// @flow
import createMentionPlugin from 'slate-poor-mentions';
import mentions from '../constants/mentions';
import '../style/mention.css';

const beforeMatchRegex = /{* *[$@] *[^{}\n]*$/;
const afterMatchRegex = /^[^{}\n]*}/;

export default createMentionPlugin({
    mentions,
    beforeMatchRegex,
    afterMatchRegex
});
