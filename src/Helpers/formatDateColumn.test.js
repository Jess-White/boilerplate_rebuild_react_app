import formatDateColumn from "./formatDateColumn";

describe("formatDateColumn", () => {
  it("format datetime string into MMM DD YYYY format", () => {
    expect(formatDateColumn("2020-04-30T07:49:00.000Z")).toEqual(
      "Apr 30, 2020"
    );
    expect(formatDateColumn("2021-11-11T09:30:01.000Z")).toEqual(
      "Nov 11, 2021"
    );
  });
});
