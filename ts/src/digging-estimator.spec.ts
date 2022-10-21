import { DiggingEstimator } from "./digging-estimator";

describe("digging estimator", () => {
  it("should return as Dr Pockovsky said", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]

    const estimator = new DiggingEstimator();
    jest.spyOn(estimator, 'get').mockImplementation(() => [0, 3, 5.5, 7]);
  
    const result = estimator.tunnel(28, 2, "granite");

    expect(result.total).toBe(48);
  });

  /*it("should return an exception if day or length is not entier or if length or day is < 0", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimator();

    const result = estimator.tunnel(28.2, 2, "granite");

    expect(result.total).toBe(48); // exception;
  });*/
});