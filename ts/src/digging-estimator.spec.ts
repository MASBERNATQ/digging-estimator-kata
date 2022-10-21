import {
  DiggingEstimator,
  InvalidFormatException,
  TunnelTooLongForDelayException,
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
});
