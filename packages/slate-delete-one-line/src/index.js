// @flow
import HotKeys from 'slate-hotkeys';
import { type Change } from 'slate';
import deleteLineBackward from './changes/delete-line-backward';
import deleteLineForward from './changes/delete-line-forward';

type Options = {
    backward?: *,
    forward?: *
};

type HandleKeyDown = (SyntheticKeyboardEvent<*>, Change) => *;

function onKeyDown(options: Options): HandleKeyDown {
    const { forward, backward } = options;

    return (event: SyntheticKeyboardEvent<*>, change: Change) => {
        const { value } = change;
        if (value.isExpanded) return undefined;

        if (HotKeys.isDeleteLineBackward(event) && backward) {
            return deleteLineBackward(change);
        }

        if (HotKeys.isDeleteLineForward(event) && forward) {
            return deleteLineForward(change);
        }
        return undefined;
    };
}

export default function(options?: Options = {}) {
    const { backward = true, forward = true } = options;
    return { onKeyDown: onKeyDown({ backward, forward }) };
}
