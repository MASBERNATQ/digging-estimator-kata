import DiggingEstimator from "@/DiggingEstimator/DiggingEstimator";

export class DiggingEstimatorTest {
  estimator: DiggingEstimator;
  getDiggingRatePublic: jest.SpyInstance<number[], [rockType: string]> | null = null;
  hasGoblins: jest.SpyInstance<boolean, [location: string]> | null = null;

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
   * Mock getDiggingRatePublic method.
   *
   * @param {number[]} returnValue Value to assign
   * @return {DiggingEstimatorTest}
   */
  public mockGetDiggingRatePublic(returnValue: number[]): DiggingEstimatorTest {
    this.getDiggingRatePublic = jest
      .spyOn(this.estimator, "getDiggingRatePublic")
      .mockReturnValue(returnValue);

    return this;
  }

  /**
   * Mock hasGoblins method.
   *
   * @param {number[]} returnValue Value to assign
   * @return {DiggingEstimatorTest}
   */
  public mockHasGoblins(
    returnValue: boolean
  ): DiggingEstimatorTest {
    this.hasGoblins = jest
      .spyOn(this.estimator, "hasGoblins")
      .mockReturnValue(returnValue);

    return this;
  }
}

export default DiggingEstimatorTest;
