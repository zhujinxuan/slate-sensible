/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

export function runChange(simulator) {
    simulator.keyDown({ key: 'Enter' });
    return simulator.value;
}

export const input = (
    <value>
        <document>
            <cell>
                {'\n'}
                <anchor />POI<focus />
                {'cat is cute'}
            </cell>
        </document>
    </value>
);

export const output = input;
