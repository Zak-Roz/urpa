export default class Poa {
  constructor(property, principal_name, is_duplicate, expiry_date, register_number, certification_date, blank_number, blank_series, registration_date, confident_code, confident_name, principal_code) { // , passportSeries, passportNumber, passportIssueDate, passportAuthority, rntrc
    this.is_duplicate = is_duplicate;
    this.expiry_date = expiry_date;
    this.register_number = register_number;
    this.certification_date = certification_date;
    this.blank_number = blank_number;
    this.blank_series = blank_series;
    this.registration_date = registration_date;
    this.confident_code = confident_code;
    this.confident_name = confident_name;
    this.principal_code = principal_code;
    this.principal_name = principal_name;
    this.property = property;
  }
}
