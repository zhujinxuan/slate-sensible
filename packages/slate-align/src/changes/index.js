// @flow
import { type Range, type Change } from 'slate';
import type Options from '../options';
import getAlignBlocksAtRange from '../utils/getAlignBlocksAtRange';

function createChanges(opts: Options) {
    return {
        removeAlignAtRange: removeAlignAtRange(opts),
        setAlignAtRange: setAlignAtRange(opts)
    };
}

function removeAlignAtRange(opts: Options) {
    return (change: Change, range: Range, align: string) => {
        const { document } = change.value;
        const alignBlocks = getAlignBlocksAtRange(opts, range, document)
            .filter(n => n.data && n.data.get('textAlign') === align)
            .reverse();
        alignBlocks.forEach(n => {
            change.setNodeByKey(
                n.key,
                { data: n.data.delete('textAlign') },
                { normalize: false }
            );
        });
    };
}

function setAlignAtRange(opts: Options) {
    return (change: Change, range: Range, align: string) => {
        if (['left', 'right', 'center'].indexOf(align) === -1) return;
        const { document } = change.value;
        const alignBlocks = getAlignBlocksAtRange(
            opts,
            range,
            document
        ).reverse();

        alignBlocks.forEach(n => {
            change.setNodeByKey(
                n.key,
                { data: n.data.set('textAlign', align) },
                { normalize: false }
            );
        });
    };
}

export default createChanges;
