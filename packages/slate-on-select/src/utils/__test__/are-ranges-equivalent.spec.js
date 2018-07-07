/** @jsx h */
import h from './h';
import areRangesEquivalent from '../are-ranges-equivalent';

describe('slate-on-select', () => {
    describe('are-ranges-equivalent', () => {
        it('same-selection', () => {
            const { document, selection } = (
                <value>
                    <document>
                        <paragraph>
                            <anchor />Cat is Cute<focus />
                        </paragraph>
                    </document>
                </value>
            );

            const result = areRangesEquivalent(document, selection, selection);
            expect(result).toBe(true);
        });

        it('inline-same-selection', () => {
            const { document, selection } = (
                <value>
                    <document>
                        <paragraph>
                            <text key="a">
                                <anchor />
                            </text>
                            <inline type="link" key="b">
                                Cat is Cute
                            </inline>
                            <text key="c">
                                <focus />
                            </text>
                        </paragraph>
                    </document>
                </value>
            );
            const range2 = selection.moveToRangeOf(document.getDescendant('b'));
            const result = areRangesEquivalent(document, selection, range2);
            expect(selection.anchorKey).toBe('a');
            expect(selection.focusKey).toBe('c');
            expect(result).toBe(true);
        });

        it('inline-same-collapsed', () => {
            const { document, selection } = (
                <value>
                    <document>
                        <paragraph>
                            <text key="a">
                                <cursor />
                            </text>
                            <inline type="link" key="b">
                                Cat is Cute
                            </inline>
                            <text key="c" />
                        </paragraph>
                    </document>
                </value>
            );
            const range2 = selection.collapseToStartOf(
                document.getDescendant('b')
            );
            const result = areRangesEquivalent(document, selection, range2);
            expect(result).toBe(true);
        });

        it('inline-different-selection', () => {
            const { document, selection } = (
                <value>
                    <document>
                        <paragraph>
                            <text key="a" />
                            <inline type="link" key="b">
                                Cat is Cut<cursor />e
                            </inline>
                            <text key="c" />
                        </paragraph>
                    </document>
                </value>
            );
            const range2 = selection.moveToRangeOf(document.getDescendant('c'));
            const result = areRangesEquivalent(document, selection, range2);
            expect(result).toBe(false);
        });

        it('different-block', () => {
            const { document, selection } = (
                <value>
                    <document>
                        <paragraph>
                            Cat is Cute<cursor />
                        </paragraph>
                        <paragraph key="b">Cat is Cute</paragraph>
                    </document>
                </value>
            );
            const range2 = selection.collapseToStartOf(
                document.getDescendant('b')
            );
            const result = areRangesEquivalent(document, selection, range2);
            expect(result).toBe(false);
        });
    });
});
