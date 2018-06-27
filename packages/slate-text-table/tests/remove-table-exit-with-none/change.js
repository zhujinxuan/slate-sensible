import EditTable from 'slate-text-table';

export default function(prevPlugin, change) {
    const plugin = EditTable({ exitBlockType: null });
    const cursorBlock = change.value.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);
    return plugin.changes.removeTable(change);
}
