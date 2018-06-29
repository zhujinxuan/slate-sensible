// @flow
import type Options from '../options';
import createNormalizer from './normalize/index';

function createSchema(opts: Options): Object {
    const { typeBadCell, typeBadTable, typeBadRow } = opts;
    const normalizer = createNormalizer(opts);
    return {
        blocks: {
            [typeBadTable]: {
                nodes: [{ objects: ['block'], types: [typeBadRow], min: 1 }],
                parent: { objects: ['document'] },
                normalize: normalizer.table
            },
            [typeBadRow]: {
                nodes: [
                    {
                        objects: ['block'],
                        types: [typeBadCell],
                        min: 2
                    }
                ],
                parent: { types: [typeBadTable] },
                normalize: normalizer.row
            },
            [typeBadCell]: {
                parent: { types: [typeBadRow] },
                nodes: [{ objects: ['block'], min: 1 }],
                normalize: normalizer.cell
            }
        }
    };
}

export default createSchema;
