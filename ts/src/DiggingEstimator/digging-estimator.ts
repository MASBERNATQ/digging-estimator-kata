import { InvalidFormatException, TunnelTooLongForDelayException } from "../ErrorException";
import TeamComposition from "../Team/TeamComposition";

export class DiggingEstimator {
  /**
   * Tunnel.
   *
   * @param {number} length Tunnel length
   * @param {number} days Time in days to dig the tunnel
   * @param {string} rockType Type of rock
   * @return {TeamComposition}
   */
  tunnel(length: number, days: number, rockType: string): TeamComposition {
    const digPerRotation = this.getPublic(rockType);
    const maxDigPerRotation = digPerRotation[digPerRotation.length - 1];
    const maxDigPerDay = 2 * maxDigPerRotation;
    const digPerDay = Math.floor(length / days);

    if (
      Math.floor(length) !== length ||
      Math.floor(days) !== days ||
      length < 0 ||
      days < 0
    ) {
      throw new InvalidFormatException();
    }

    if (digPerDay > maxDigPerDay) {
      throw new TunnelTooLongForDelayException();
    }

    const composition = new TeamComposition();
    const { dayTeam: dt, nightTeam: nt } = composition;

    // Miners
    for (let i = 0; i < digPerRotation.length - 1; ++i) {
      if (digPerRotation[i] < digPerDay) {
        dt.miners++;
      }
    }
    if (digPerDay > maxDigPerRotation) {
      for (let i = 0; i < digPerRotation.length - 1; ++i) {
        if (digPerRotation[i] + maxDigPerRotation < digPerDay) {
          nt.miners++;
        }
      }
    }

    if (dt.miners > 0) {
      dt.healers++;
      dt.smithies += 2;
      dt.innKeepers = Math.ceil((dt.miners + dt.healers + dt.smithies) / 4) * 4;
      dt.washers = Math.ceil((dt.miners + dt.healers + dt.smithies + dt.innKeepers) / 10);
    }

    if (nt.miners > 0) {
      nt.healers++;
      nt.smithies += 2;
      nt.lighters = nt.miners + 1;
      nt.innKeepers = Math.ceil((nt.miners + nt.healers + nt.smithies + nt.lighters) / 4) * 4;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const oldWashers = nt.washers;
      const oldGuard = nt.guards;
      const oldChiefGuard = nt.guardManagers;

      nt.washers = Math.ceil(
        (nt.miners +
          nt.healers +
          nt.smithies +
          nt.innKeepers +
          nt.lighters +
          nt.guards +
          nt.guardManagers) /
          10
      );
      nt.guards = Math.ceil((nt.healers + nt.miners + nt.smithies + nt.lighters + nt.washers) / 3);
      nt.guardManagers = Math.ceil(nt.guards / 3);

      if (
        oldWashers === nt.washers &&
        oldGuard === nt.guards &&
        oldChiefGuard === nt.guardManagers
      ) {
        break;
      }
    }

    composition.total =
      dt.miners +
      dt.washers +
      dt.healers +
      dt.smithies +
      dt.innKeepers +
      nt.miners +
      nt.washers +
      nt.healers +
      nt.smithies +
      nt.innKeepers +
      nt.guards +
      nt.guardManagers +
      nt.lighters;

    return composition;
  }

  /**
   * Get a list with number of meters dug per day and per miners.
   *
   * @param {string} rockType Type of rock
   */
  private get(rockType: string): number[] {
    // For example, for granite it returns [0, 3, 5.5, 7]
    // if you put 0 dwarf, you dig 0m/d/team
    // if you put 1 dwarf, you dig 3m/d/team
    // 2 dwarves = 5.5m/d/team
    // so a day team on 2 miners and a night team of 1 miner dig 8.5m/d
    const url = `dtp://research.vin.co/digging-rate/${rockType}`;
    console.log(`Tried to fetch ${url}`);
    throw new Error("Does not work in test mode");
  }

  /**
   * Public method to bypass the private method get.
   *
   * @param {string} rockType Type of rock
   * @return {number[]}
   */
  public getPublic(rockType: string): number[] {
    return this.get(rockType);
  }
}

export default DiggingEstimator;
