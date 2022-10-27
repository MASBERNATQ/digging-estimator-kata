import DiggingEstimator from "@/DiggingEstimator/DiggingEstimator";

export class DiggingEstimatorTest {
  estimator: DiggingEstimator;
  getDiggingRate: jest.SpyInstance<number[], [rockType: string]> | null = null;
  hasGoblinsAccordingLocation: jest.SpyInstance<boolean, [location: string]> | null = null;

  /**
   * Constructor.
   */
  constructor() {
    this.estimator = new DiggingEstimator();
  }

  /**
   * Get estimator instance.
   *
   * @return {DiggingEstimator}
   */
  public getInstance(): DiggingEstimator {
    return this.estimator;
  }

  /**
   * Mock getDiggingRate.
   *
   * @param {number[]} returnValue Value to assign
   * @return {DiggingEstimatorTest}
   */
  public mockGetDiggingRate(returnValue: number[]): DiggingEstimatorTest {
    this.getDiggingRate = jest
      .spyOn(this.estimator, "getPublic")
      .mockReturnValue(returnValue);

    return this;
  }

  /**
   * Mock hasGoblinsAccordingLocation.
   *
   * @param {number[]} returnValue Value to assign
   * @return {DiggingEstimatorTest}
   */
  public mockHasGoblinsAccordingLocation(
    returnValue: boolean
  ): DiggingEstimatorTest {
    this.hasGoblinsAccordingLocation = jest
      .spyOn(this.estimator, "hasGoblinsAccordingLocation")
      .mockReturnValue(returnValue);

    return this;
  }
}

export default DiggingEstimatorTest;
