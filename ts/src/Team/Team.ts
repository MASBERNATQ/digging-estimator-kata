export class Team {
  miners = 0;
  healers = 0;
  smithies = 0;
  lighters = 0;
  innKeepers = 0;
  guards = 0;
  guardManagers = 0;
  washers = 0;

  /**
   * Calcul the number of healers.
   *
   * @return {number}
   */
  public calculHealers(): number {
    if (this.atLeastOneMiner()) {
      this.healers = 1;
    }

    return this.healers;
  }

  /**
   * Calcul the number of smithies.
   *
   * @return {number}
   */
  public calculSmithies(): number {
    if (this.atLeastOneMiner()) {
      this.smithies = 2;
    }

    return this.smithies;
  }

  /**
   * Calcul the number of lighters.
   *
   * @return {number}
   */
  public calculLighters(): number {
    if (this.atLeastOneMiner()) {
      this.lighters = this.miners + 1;
    }

    return this.lighters;
  }

  /**
   * Calcul the number of innkeepers.
   *
   * @return {number}
   */
  public calculInnKeepers(): number {
    if (this.atLeastOneMiner()) {
      this.innKeepers =
        Math.ceil(
          (this.miners + this.healers + this.smithies + this.lighters) / 4
        ) * 4;
    }

    return this.innKeepers;
  }

  /**
   * Calcul the number of guards.
   *
   * @return {number}
   */
  public calculGuards(): number {
    if (this.atLeastOneMiner()) {
      this.guards = Math.ceil(
        (this.miners +
          this.healers +
          this.smithies +
          this.lighters +
          this.washers) /
          3
      );
    }

    return this.guards;
  }

  /**
   * Calcul the number of guard managers.
   *
   * @return {number}
   */
  public calculGuardManagers(): number {
    if (this.atLeastOneMiner()) {
      this.guardManagers = Math.ceil(this.guards / 3);
    }

    return this.guardManagers;
  }

  /**
   * Calcul the number of washers.
   *
   * @return {number}
   */
  public calculWashers(): number {
    if (this.atLeastOneMiner()) {
      this.washers = Math.ceil(
        (this.miners +
          this.healers +
          this.smithies +
          this.lighters +
          this.innKeepers +
          this.guards +
          this.guardManagers) /
          10
      );
    }

    return this.washers;
  }

  /**
   * Get total of team.
   *
   * @return {number}
   */
  public getTotal(): number {
    return (
      this.miners +
      this.healers +
      this.smithies +
      this.lighters +
      this.innKeepers +
      this.guards +
      this.guardManagers +
      this.washers
    );
  }

  /**
   * At least one miner.
   *
   * @return {boolean}
   */
  private atLeastOneMiner(): boolean {
    return this.miners > 0;
  }
}

export default Team;
