import parseDateFromInput from "./parseDateFromInput";

describe("parseDateFromInput", () => {
  it("returns date from datetime-local format", () => {
    expect(parseDateFromInput("2010-01-11T03:00")).toEqual(
      new Date("2010-01-11T03:00")
    );
    expect(parseDateFromInput("2022-03-19T09:45")).toEqual(
      new Date("2022-03-19T09:45")
    );
    expect(parseDateFromInput("2030-12-02T12:33")).toEqual(
      new Date("2030-12-02T12:33")
    );
  });
});
