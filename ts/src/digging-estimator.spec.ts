import { DiggingEstimator, InvalidFormatException, TunnelTooLongForDelayException } from "./digging-estimator";

describe("digging estimator", () => {
  it("should return as Dr Pockovsky said", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]

    const estimator = new DiggingEstimator();
    jest.spyOn(estimator, 'get').mockImplementation(() => [0, 3, 5.5, 7]);
  
    const result = estimator.tunnel(28, 2, "granite");

    expect(result.total).toBe(48);
  });

  it("should return an InvalidFormatException", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimator();
    jest.spyOn(estimator, 'get').mockImplementation(() => [0, 3, 5.5, 7]);
  
    expect(() => estimator.tunnel(20.2, 2, "granite")).toThrowError(new InvalidFormatException());
    expect(() => estimator.tunnel(20, 2.2, "granite")).toThrowError(new InvalidFormatException());
    expect(() => estimator.tunnel(-1, 2, "granite")).toThrowError(new InvalidFormatException());
    expect(() => estimator.tunnel(20, -1, "granite")).toThrowError(new InvalidFormatException());
  });

  it("should return an TunnelTooLongForDelayException", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimator();
    jest.spyOn(estimator, 'get').mockImplementation(() => [0, 3, 5.5, 7]);

    expect(() => estimator.tunnel(28, 1, "granite")).toThrowError(new TunnelTooLongForDelayException());
  });
});