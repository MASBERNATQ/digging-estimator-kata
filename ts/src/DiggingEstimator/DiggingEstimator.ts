import {
  InvalidFormatException,
  TunnelTooLongForDelayException,
} from "@/ErrorException";
import TeamComposition from "@/Team/TeamComposition";

export class DiggingEstimator {
  /**
   * Calcul the team composition according the length of the tunnel, the number of days and the type of rock.
   *
   * @param {number} length Tunnel length
   * @param {number} days Time in days to dig the tunnel
   * @param {string} rockType Type of rock
   * @param {string} location The region
   * @return {TeamComposition}
   */
  public tunnel(
    length: number,
    days: number,
    rockType: string,
    location: string
  ): TeamComposition {
    const digPerRotation = this.getDiggingRatePublic(rockType);
    const hasGoblins = this.hasGoblins(location);
    const digPerDay = Math.floor(length / days);
    const maxDigPerRotation = digPerRotation[digPerRotation.length - 1];

    this.checkParameters(length, days);
    this.checkDigDelay(digPerDay, maxDigPerRotation);

    const composition = new TeamComposition();
    const { dayTeam: dt, nightTeam: nt } = composition;

    // Day team
    for (let i = 0; i < digPerRotation.length - 1; ++i) {
      if (digPerRotation[i] < digPerDay) dt.miners++;
    }

    dt.calculHealers();
    dt.calculSmithies();
    if (hasGoblins) {
      dt.calculProtectors();
    }
    dt.calculInnKeepers();
    dt.calculWashers();

    // Night team
    if (digPerDay > maxDigPerRotation) {
      for (let i = 0; i < digPerRotation.length - 1; ++i) {
        if (digPerRotation[i] + maxDigPerRotation < digPerDay) nt.miners++;
      }
    }

    nt.calculHealers();
    nt.calculSmithies();
    nt.calculLighters();
    if (hasGoblins) {
      nt.calculProtectors();
      nt.lighters += 2;
    }
    nt.calculInnKeepers();

    let oldWashers, oldGuard, oldChiefGuard;
    do {
      oldWashers = nt.calculWashers();
      oldGuard = nt.calculGuards();
      oldChiefGuard = nt.calculGuardManagers();
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
   * @param {number} maxDigPerRotation Max dig per rotation
   * @return {void}
   */
  private checkDigDelay(digPerDay: number, maxDigPerRotation: number): void {
    const maxDigPerDay = 2 * maxDigPerRotation;

    if (digPerDay > maxDigPerDay) {
      throw new TunnelTooLongForDelayException();
    }
  }

  /**
   * Service for get a list with number of meters dug per day and per team miners.
   *
   * @example
   * // For example, for granite it returns [0, 3, 5.5, 7]
   * // if you put 0 dwarf, you dig 0m/d/team
   * // if you put 1 dwarf, you dig 3m/d/team
   * // so a day team on 2 miners and a night team of 1 miner dig 8.5m/d
   * @param {string} rockType Type of rock
   */
  private getDiggingRate(rockType: string): number[] {
    const url = `dtp://research.vin.co/digging-rate/${rockType}`;
    console.log(`Tried to fetch ${url}`);
    throw new Error("Does not work in test mode");
  }

  /**
   * Service for check if there are goblins in the region.
   *
   * @param {string} location The region
   */
  public hasGoblins(location: string): boolean {
    const url = `dtp://research.vin.co/are-there-goblins/${location}`;
    console.log(`Tried to fetch ${url}`);
    throw new Error("Does not work in test mode");
  }

  /**
   * Public method to bypass the private method getDiggingRate.
   *
   * @param {string} rockType Type of rock
   * @return {number[]}
   */
  public getDiggingRatePublic(rockType: string): number[] {
    return this.getDiggingRate(rockType);
  }
}

export default DiggingEstimator;
