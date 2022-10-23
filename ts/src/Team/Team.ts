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
