import {
  DiggingEstimator,
  InvalidFormatException,
  TeamComposition,
  TunnelTooLongForDelayException,
} from "./digging-estimator";

describe("DiggingEstimator", () => {
  let estimator: DiggingEstimator;
  let getDiggingRateForGranite: jest.SpyInstance<number[], [rockType: string]>;

  beforeEach(() => {
    estimator = new DiggingEstimator();
    getDiggingRateForGranite = jest
      .spyOn(estimator, "getPublic")
      .mockImplementation(() => [0, 3, 5.5, 7]);
  });

  it("should called get digging rate", () => {
    estimator.tunnel(28, 2, "granite");
    expect(getDiggingRateForGranite).toHaveBeenCalled();
    expect(getDiggingRateForGranite).toHaveBeenCalledTimes(1);
  });

  it("should return an InvalidFormatException", () => {
    expect(() => estimator.tunnel(20.2, 2, "granite")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(20, 2.2, "granite")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(-1, 2, "granite")).toThrow(new InvalidFormatException());
    expect(() => estimator.tunnel(20, -1, "granite")).toThrow(new InvalidFormatException());
  });

  it("should return an TunnelTooLongForDelayException", () => {
    expect(() => estimator.tunnel(28, 1, "granite")).toThrow(new TunnelTooLongForDelayException());
  });

  it("should return team composition for 28m / 2 days / granite", () => {
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

  it("should return team composition for 15m / 3 days / granite", () => {
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
    expect(teamComposition.nightTeam).toEqual({
      miners: 0,
      healers: 0,
      smithies: 0,
      lighters: 0,
      innKeepers: 0,
      guards: 0,
      guardManagers: 0,
      washers: 0,
    });
  });
});

