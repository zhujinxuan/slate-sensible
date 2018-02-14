function equalRanges(oldRange, newRange) {
  const comparedKeys = [
    "anchorOffset",
    "anchorOffset",
    "focusKey",
    "focusOffset"
  ];
  for (const key of comparedKeys) {
    if (oldRange[key] !== newRange[key]) {
      return false;
    }
  }
  return true;
}

export default equalRanges;
