import {
  InvalidFormatException,
  TunnelTooLongForDelayException,
} from "@/ErrorException";
import DiggingEstimator from "@/DiggingEstimator/DiggingEstimator";
import DiggingEstimatorTest from "@/DiggingEstimator/DiggingEstimatorTest";
import TeamComposition from "@/Team/TeamComposition";

describe("DiggingEstimator", () => {
  let estimatorTest: DiggingEstimatorTest;

  beforeEach(() => {
    estimatorTest = new DiggingEstimatorTest()
      .mockGetDiggingRate([0, 3, 5.5, 7])
      .mockHasGoblinsAccordingLocation(false);
  });

  it("should call the get method", () => {
    estimatorTest.getInstance().tunnel(28, 2, "granite", "bretagne");
    expect(estimatorTest.getDiggingRate).toHaveBeenCalled();
  });

  it("should call the hasGoblinsAccordingLocation method", () => {
    estimatorTest.getInstance().tunnel(28, 2, "granite", "bretagne");
    expect(estimatorTest.hasGoblinsAccordingLocation).toHaveBeenCalled();
  });

  it("should return an error when get method is called", () => {
    expect(() => new DiggingEstimator().getPublic("granite")).toThrow(new Error("Does not work in test mode"));
  });

  it("should return an error when hasGoblinsAccordingLocation method is called", () => {
    expect(() => new DiggingEstimator().hasGoblinsAccordingLocation("poitou-charentes")).toThrow(new Error("Does not work in test mode"));
  });

  it("should return an error if parameters are invalid", () => {
    const estimator = estimatorTest.getInstance();

    expect(() => estimator.tunnel(20.2, 2, "granite", "bretagne")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(20, 2.2, "granite","bretagne")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(-1, 2, "granite", "bretagne")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(20, -1, "granite", "bretagne")).toThrow(new InvalidFormatException());
  });

  it("should return an error if tunnel is too long for delay", () => {
    expect(() => estimatorTest.getInstance().tunnel(28, 1, "granite", "bretagne")).toThrow(new TunnelTooLongForDelayException());
  });

  it("should return the composition of the team to dig a 28 meters granite rock for 2 days in a region without goblins", () => {
    const teamComposition: TeamComposition = estimatorTest.getInstance().tunnel(28, 2, "granite", "bretagne");

    expect(teamComposition.total).toBe(48);
    expect(teamComposition.dayTeam).toEqual({
      miners: 3,
      healers: 1,
      smithies: 2,
      lighters: 0,
      innKeepers: 8,
      guards: 0,
      guardManagers: 0,
      washers: 2,
      protectors: 0,
    });
    expect(teamComposition.nightTeam).toEqual({
      miners: 3,
      healers: 1,
      smithies: 2,
      lighters: 4,
      innKeepers: 12,
      guards: 5,
      guardManagers: 2,
      washers: 3,
      protectors: 0,
    });
  });

  it("should return the composition of the team to dig a 3 meters granite rock for 1 day in a region without goblins", () => {
    const teamComposition: TeamComposition = estimatorTest.getInstance().tunnel(3, 1, "granite", "bretagne");

    expect(teamComposition.total).toBe(9);
    expect(teamComposition.dayTeam).toEqual({
      miners: 1,
      healers: 1,
      smithies: 2,
      lighters: 0,
      innKeepers: 4,
      guards: 0,
      guardManagers: 0,
      washers: 1,
      protectors: 0,
    });
  });

  it("should return the composition of the team to dig a 15 meters granite rock for 3 days in a region without goblins", () => {
    const teamComposition: TeamComposition = estimatorTest.getInstance().tunnel(15, 3, "granite", "bretagne");

    expect(teamComposition.total).toBe(15);
    expect(teamComposition.dayTeam).toEqual({
      miners: 2,
      healers: 1,
      smithies: 2,
      lighters: 0,
      innKeepers: 8,
      guards: 0,
      guardManagers: 0,
      washers: 2,
      protectors: 0,
    });
  });

  it("should return the composition of the team to dig a 28 meters granite rock for 2 days in a region of goblins", () => {
    estimatorTest.mockHasGoblinsAccordingLocation(true);
    const teamComposition: TeamComposition = estimatorTest.getInstance().tunnel(28, 2, "granite", "normandie");

    expect(teamComposition.total).toBe(58);
    expect(teamComposition.dayTeam).toEqual({
      miners: 3,
      healers: 1,
      smithies: 2,
      lighters: 0,
      innKeepers: 8,
      guards: 0,
      guardManagers: 0,
      washers: 2,
      protectors: 2,
    });
    expect(teamComposition.nightTeam).toEqual({
      miners: 3,
      healers: 1,
      smithies: 2,
      lighters: 6,
      innKeepers: 16,
      guards: 5,
      guardManagers: 2,
      washers: 3,
      protectors: 2,
    });
  });
});
