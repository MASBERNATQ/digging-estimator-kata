import {
  InvalidFormatException,
  TunnelTooLongForDelayException,
} from "../ErrorException";
import TeamComposition from "../Team/TeamComposition";

export class DiggingEstimator {
  /**
   * Calcul the team composition according the length of the tunnel, the number of days and the type of rock.
   *
   * @param {number} length Tunnel length
   * @param {number} days Time in days to dig the tunnel
   * @param {string} rockType Type of rock
   * @return {TeamComposition}
   */
  public tunnel(
    length: number,
    days: number,
    rockType: string
  ): TeamComposition {
    const digPerRotation = this.getPublic(rockType);
    const digPerDay = Math.floor(length / days);
    const maxDigPerRotation = digPerRotation[digPerRotation.length - 1];
    const maxDigPerDay = 2 * maxDigPerRotation;

    this.checkParameters(length, days);
    this.checkDigDelay(digPerDay, maxDigPerDay);

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
      dt.calculHealers();
      dt.calculSmithies();
      dt.calculInnKeepers();
      dt.calculWashers();
    }

    if (nt.miners > 0) {
      nt.calculHealers();
      nt.calculSmithies();
      nt.calculLighters();
      nt.calculInnKeepers();
    }

    let oldWashers, oldGuard, oldChiefGuard;
    do {
      oldWashers = nt.washers;
      oldGuard = nt.guards;
      oldChiefGuard = nt.guardManagers;

      nt.calculWashers();
      nt.calculGuards();
      nt.calculGuardManagers();
    } while (
      oldWashers !== nt.washers &&
      oldGuard !== nt.guards &&
      oldChiefGuard !== nt.guardManagers
    );

    composition.total = dt.getTotal() + nt.getTotal();

    return composition;
  }

  /**
   * Check if the parameters are valid.
   *
   * @param {number} length Tunnel length
   * @param {number} days Time in days to dig the tunnel
   * @return {void}
   */
  private checkParameters(length: number, days: number): void {
    if (
      Math.floor(length) !== length ||
      Math.floor(days) !== days ||
      length < 0 ||
      days < 0
    ) {
      throw new InvalidFormatException();
    }
  }

  /**
   * Check if the dig delay is possible.
   *
   * @param {number} digPerDay Dig per day
   * @param {number} maxDigPerDay Max dig per day
   * @return {void}
   */
  private checkDigDelay(digPerDay: number, maxDigPerDay: number): void {
    if (digPerDay > maxDigPerDay) {
      throw new TunnelTooLongForDelayException();
    }
  }

  /**
   * Get a list with number of meters dug per day and per team miners.
   *
   * @example
   * // For example, for granite it returns [0, 3, 5.5, 7]
   * // if you put 0 dwarf, you dig 0m/d/team
   * // if you put 1 dwarf, you dig 3m/d/team
   * // 2 dwarves = 5.5m/d/team
   * // so a day team on 2 miners and a night team of 1 miner dig 8.5m/d
   * @param {string} rockType Type of rock
   */
  private get(rockType: string): number[] {
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
