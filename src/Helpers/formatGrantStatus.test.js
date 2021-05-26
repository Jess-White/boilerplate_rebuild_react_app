import formatGrantStatus from "./formatGrantStatus";

describe("formatGrantStatus", () => {
  it("returns 'Archived' when grant.archived is true", () => {
    const status = formatGrantStatus({ archived: true });
    expect(status).toEqual("Archived");
  });

  it("returns 'Successful' when grant.successful is true", () => {
    const status = formatGrantStatus({ successful: true });
    expect(status).toEqual("Successful");
  });

  it("returns 'Submitted' when grant.submitted is true and not successful", () => {
    const status = formatGrantStatus({ submitted: true, successful: false });
    expect(status).toEqual("Submitted");
  });

  it("returns 'Draft' when grant.submitted is false and neither archived nor successful", () => {
    const status = formatGrantStatus({
      submitted: false,
      archived: false,
      successful: false,
    });
    expect(status).toEqual("Draft");
  });
});
