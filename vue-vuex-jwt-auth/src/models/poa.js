export default class Poa {
  constructor(is_active, property, register_number, registration_date, principal_name, is_duplicate, expiry_date, certification_date, blank_number, blank_series, confident_code, confident_name, principal_code) { // , passportSeries, passportNumber, passportIssueDate, passportAuthority, rntrc
    this.is_active = is_active;
    this.is_duplicate = is_duplicate;
    this.expiry_date = expiry_date;
    this.register_number = register_number;  // deprecated
    this.certification_date = certification_date;
    this.blank_number = blank_number;
    this.blank_series = blank_series;
    this.registration_date = registration_date; // auto create
    this.confident_code = confident_code;
    this.confident_name = confident_name;
    this.principal_code = principal_code;
    this.principal_name = principal_name;
    this.property = property;
  }
}
