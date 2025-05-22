class DateUtils {
    constructor() {
      if (DateUtils.instance) {
        return DateUtils.instance;
      }
      DateUtils.instance = this;
    }
  
    /**
     * Add days to a given date (default now) and return the new Date object.
     * @param {number} days - Number of days to add (can be negative).
     * @param {Date} [baseDate=new Date()] - Optional base date.
     * @returns {Date} New date after adding days.
     */
    addDays(days, baseDate = new Date()) {
      const result = new Date(baseDate);
      result.setDate(result.getDate() + days);
      return result;
    }

  }
  
  module.exports = new DateUtils();
  