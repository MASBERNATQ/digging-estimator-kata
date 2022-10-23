import { InvalidFormatException, TunnelTooLongForDelayException } from "../ErrorException";
import DiggingEstimator from "../DiggingEstimator/digging-estimator";
import TeamComposition from "../Team/TeamComposition";

describe("DiggingEstimator", () => {
  let estimator: DiggingEstimator;
  let getDiggingRateForGranite: jest.SpyInstance<number[], [rockType: string]>;

  beforeEach(() => {
    estimator = new DiggingEstimator();
    getDiggingRateForGranite = jest
      .spyOn(estimator, "getPublic")
      .mockReturnValue([0, 3, 5.5, 7]);
  });

  it("should call the get function in order to get the digging rate", () => {
    estimator.tunnel(28, 2, "granite");
    expect(getDiggingRateForGranite).toHaveBeenCalled();
    expect(getDiggingRateForGranite).toHaveBeenCalledTimes(1);
  });

  it("should return an error if parameters are invalid", () => {
    expect(() => estimator.tunnel(20.2, 2, "granite")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(20, 2.2, "granite")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(-1, 2, "granite")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(20, -1, "granite")).toThrow(new InvalidFormatException());
  });

  it("should return an error if tunnel is too long for delay", () => {
    expect(() => estimator.tunnel(28, 1, "granite")).toThrow(new TunnelTooLongForDelayException());
  });

  it("should return the composition of the team to dig a 28 meters granite rock for 2 days", () => {
    const teamComposition: TeamComposition = estimator.tunnel(28, 2, "granite");
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
    });
  });

  it("should return the composition of the team to dig a 3 meters granite rock for 1 day", () => {
    const teamComposition: TeamComposition = estimator.tunnel(3, 1, "granite");
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
    });
  });

  it("should return the composition of the team to dig a 15 meters granite rock for 3 days", () => {
    const teamComposition: TeamComposition = estimator.tunnel(15, 3, "granite");
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
    });
  });
});
