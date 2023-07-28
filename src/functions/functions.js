export function toIso8601(month, day, hour, minute, second) {
    if (month < 10) {
      month = '0' + month;
    }
    else {
      month = month.toString()
    }
    if (day < 10) {
      day = '0' + day;
    }
    else {
      day = day.toString()
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    else {
      hour = hour.toString()
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    else {
      minute = minute.toString();
    }
    if (second < 10) {
      second = '0' + second;
    }
    else {
      second = second.toString()
    }
    return {
      "month": month,
      "day": day,
      "hour": hour,
      "minute": minute,
      "second": second
    }
  }