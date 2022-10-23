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
   * @return {void}
   */
   calculHealers(): void {
    this.healers += 1;
  }

  /**
   * Calcul the number of smithies.
   *
   * @return {void}
   */
  calculSmithies(): void {
    this.smithies += 2;
  }

  /**
   * Calcul the number of lighters.
   *
   * @return {void}
   */
  calculLighters(): void {
    this.lighters = this.miners + 1;
  }

  /**
   * Calcul the number of innkeepers.
   *
   * @return {void}
   */
  calculInnKeepers(): void {
    this.innKeepers =
      Math.ceil(
        (this.miners + this.healers + this.smithies + this.lighters) / 4
      ) * 4;
  }

  /**
   * Calcul the number of guards.
   *
   * @return {void}
   */
  calculGuards(): void {
    this.guards = Math.ceil(
      (this.healers +
        this.miners +
        this.smithies +
        this.lighters +
        this.washers) /
        3
    );
  }

  /**
   * Calcul the number of guard managers.
   *
   * @return {void}
   */
  calculGuardManagers(): void {
    this.guardManagers = Math.ceil(this.guards / 3);
  }

  /**
   * Calcul the number of washers.
   *
   * @return {void}
   */
  calculWashers(): void {
    this.washers = Math.ceil(
      (this.miners +
        this.healers +
        this.smithies +
        this.innKeepers +
        this.lighters +
        this.guards +
        this.guardManagers) /
        10
    );
  }

  /**
   * Get total of team.
   *
   * @return {number}
   */
  getTotal(): number {
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
}

export default Team;
