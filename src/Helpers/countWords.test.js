import countWords from "./countWords";

describe("countWords", () => {
  it("returns the number of words in a given string", () => {
    expect(countWords("Hello!")).toEqual(1);
    expect(countWords("Lorem Ipsum.")).toEqual(2);
  });

  it("counts digits as words", () => {
    expect(countWords("The house is 120 years old.")).toEqual(6);
  });

  it("does not include whitespace, tabs, or newlines in word count", () => {
    expect(countWords("\n\tThat is       great!\n")).toEqual(3);
  });

  it("returns zero given empty string", () => {
    expect(countWords("")).toEqual(0);
  });
});
