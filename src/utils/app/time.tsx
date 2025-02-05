/**
 * Creates a countdown timer string in the format HH:MM:SS from a given number of seconds.
 *
 * @param {number} seconds - The total number of seconds to convert into a countdown string.
 * @returns {string} A string representing the countdown in the format HH:MM:SS.
 *
 * @example
 * ```typescript
 * const countdown = createCountdown(3661);
 * console.log(countdown); // "01:01:01"
 * ```
 */
export function createCountdown(seconds: number): string {
     const hours = Math.floor(seconds / 3600);
     const minutes = Math.floor((seconds % 3600) / 60);
     const remainingSeconds = seconds % 60;

     const hoursString = hours.toString().padStart(2, '0');
     const minutesString = minutes.toString().padStart(2, '0');
     const secondsString = remainingSeconds.toString().padStart(2, '0');

     return hours ? `${hoursString}:${minutesString}:${secondsString}` : `${minutesString}:${secondsString}`;
}