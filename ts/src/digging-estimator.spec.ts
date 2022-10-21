import {
  DiggingEstimator,
  InvalidFormatException,
  TunnelTooLongForDelayException,
  TeamComposition,
  Team
} from "./digging-estimator";

describe("DiggingEstimator", () => {
  let estimator: DiggingEstimator;
  let getDiggingRateForGranite: jest.SpyInstance<number[], [rockType: string]>;

  beforeEach(() => {
    estimator = new DiggingEstimator();
    getDiggingRateForGranite = jest
      .spyOn(estimator, "get")
      .mockImplementation(() => [0, 3, 5.5, 7]);
  });

  it("should called get digging rate", () => {
    estimator.tunnel(28, 2, "granite");
    expect(getDiggingRateForGranite).toHaveBeenCalled();
    expect(getDiggingRateForGranite).toHaveBeenCalledTimes(1);
  });

  it("should return as Dr Pockovsky said", () => {
    const teamComposition = estimator.tunnel(28, 2, "granite");
    expect(teamComposition.total).toBe(48);
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

  it("should return the composition of team for the day and the night", () => {
    const teamComposition: TeamComposition = estimator.tunnel(15, 3, "granite");
    const dayTeam: Team = teamComposition.dayTeam;
    const nightTeam: Team = teamComposition.dayTeam;

    // Day
    expect(dayTeam.miners).toBe(2);
    expect(dayTeam.healers).toBe(1);
    expect(dayTeam.smithies).toBe(2);
    expect(dayTeam.lighters).toBe(0);
    expect(dayTeam.innKeepers).toBe(8);
    expect(dayTeam.guards).toBe(0);
    expect(dayTeam.guardManagers).toBe(0);
    expect(dayTeam.washers).toBe(2);

    // Night
    expect(nightTeam.miners).toBe(2);
    expect(nightTeam.healers).toBe(1);
    expect(nightTeam.smithies).toBe(2);
    expect(nightTeam.lighters).toBe(0);
    expect(nightTeam.innKeepers).toBe(8);
    expect(nightTeam.guards).toBe(0);
    expect(nightTeam.guardManagers).toBe(0);
    expect(nightTeam.washers).toBe(2);
  });


});

