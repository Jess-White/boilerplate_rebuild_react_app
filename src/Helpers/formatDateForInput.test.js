import formatDateForInput from "./formatDateForInput";

describe("formatDateForInput", () => {
  it("returns datetime-local format from date", () => {
    expect(formatDateForInput(new Date("2010-01-11T03:00"))).toEqual(
      "2010-01-11T03:00"
    );
    expect(formatDateForInput(new Date("2022-03-19T09:45"))).toEqual(
      "2022-03-19T09:45"
    );
    expect(formatDateForInput(new Date("2030-12-02T12:33"))).toEqual(
      "2030-12-02T12:33"
    );
  });
});
