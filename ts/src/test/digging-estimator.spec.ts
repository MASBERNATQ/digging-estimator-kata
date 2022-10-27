import {
  InvalidFormatException,
  TunnelTooLongForDelayException,
} from "@/ErrorException";
import DiggingEstimator from "@/DiggingEstimator/digging-estimator";
import TeamComposition from "@/Team/TeamComposition";

describe("DiggingEstimator", () => {
  let estimator: DiggingEstimator;
  let getDiggingRateForGranite: jest.SpyInstance<number[], [rockType: string]>;
  let hasGoblinsAccordingLocation: jest.SpyInstance<boolean, [location: string]>;

  beforeEach(() => {
    estimator = new DiggingEstimator();
    getDiggingRateForGranite = jest
      .spyOn(estimator, "getPublic")
      .mockReturnValue([0, 3, 5.5, 7]);
    hasGoblinsAccordingLocation = jest
      .spyOn(estimator, "hasGoblinsAccordingLocation")
      .mockReturnValue(false);
  });

  it("should call the get function in order to get the digging rate", () => {
    estimator.tunnel(28, 2, "granite", "bretagne");
    expect(getDiggingRateForGranite).toHaveBeenCalled();
  });

  it("should return an error when get method is called", () => {
    expect(() => new DiggingEstimator().getPublic("granite")).toThrow(new Error("Does not work in test mode"));
  });

  it("should return an error when hasGoblinsAccordingLocation method is called", () => {
    expect(() => new DiggingEstimator().hasGoblinsAccordingLocation("poitou-charentes")).toThrow(new Error("Does not work in test mode"));
  });

  it("should return an error if parameters are invalid", () => {
    expect(() => estimator.tunnel(20.2, 2, "granite", "bretagne")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(20, 2.2, "granite","bretagne")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(-1, 2, "granite", "bretagne")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(20, -1, "granite", "bretagne")).toThrow(new InvalidFormatException());
  });

  it("should return an error if tunnel is too long for delay", () => {
    expect(() => estimator.tunnel(28, 1, "granite", "bretagne")).toThrow(new TunnelTooLongForDelayException());
  });

  it("should return the composition of the team to dig a 28 meters granite rock for 2 days in a region without goblins", () => {
    const teamComposition: TeamComposition = estimator.tunnel(28, 2, "granite", "bretagne");
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
    const teamComposition: TeamComposition = estimator.tunnel(3, 1, "granite", "bretagne");
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
    const teamComposition: TeamComposition = estimator.tunnel(15, 3, "granite", "bretagne");
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
    // Add region with goblins
    jest.spyOn(estimator, "hasGoblinsAccordingLocation").mockReturnValue(true);

    const teamComposition: TeamComposition = estimator.tunnel(28, 2, "granite", "normandie");
    expect(teamComposition.total).toBe(54);
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
      innKeepers: 12,
      guards: 5,
      guardManagers: 2,
      washers: 3,
      protectors: 2,
    });
  });
});
