import unique from "./unique"

describe('unique', () => {
  it('removes duplicate elements from an array', () => {
    expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    expect(unique([1, 1, 3, 4, 3])).toEqual([1, 3, 4]);
  });

  it('returns the same array when no duplicates are present', () => {
    expect(unique([])).toEqual([]);
    expect(unique(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });
});
