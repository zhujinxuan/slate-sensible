const cursorMarkType = "cursor-popup";

function findRemoveIndex(decorations, indexDeco) {
  if (indexDeco === decorations.size) {
    return -1;
  }
  const deco = decorations.get(indexDeco);
  const indexMark = deco.marks.find(mark => mark.type === cursorMarkType);
  if (indexMark) {
    return indexDeco;
  }
  return findRemoveIndex(decorations, indexDeco + 1);
}

export default findRemoveIndex;
