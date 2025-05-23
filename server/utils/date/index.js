class DateUtils {
   constructor() {
      if (DateUtils.instance) {
         return DateUtils.instance;
      }
      DateUtils.instance = this;
   }

   /**
    * Add days to a given date (default now) and return the new Date object.
    * @param {number} days - Number of days to add.
    * @param {Date} [baseDate=new Date()] - Optional base date.
    * @returns {Date}
    */
   addDays(days, baseDate = new Date()) {
      const result = new Date(baseDate);
      result.setDate(result.getDate() + days);
      return result;
   }

   // --- Time unit conversions ---

   daysToMilliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
   }

   daysToSeconds(days) {
      return days * 24 * 60 * 60;
   }

   hoursToMilliseconds(hours) {
      return hours * 60 * 60 * 1000;
   }

   minutesToMilliseconds(minutes) {
      return minutes * 60 * 1000;
   }

   secondsToMilliseconds(seconds) {
      return seconds * 1000;
   }

   millisecondsToSeconds(ms) {
      return ms / 1000;
   }

   millisecondsToMinutes(ms) {
      return ms / (60 * 1000);
   }

   millisecondsToHours(ms) {
      return ms / (60 * 60 * 1000);
   }

   millisecondsToDays(ms) {
      return ms / (24 * 60 * 60 * 1000);
   }
}

module.exports = new DateUtils();
