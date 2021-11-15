export default class User {
  constructor(fullname, login, password, dob, passportSeries, passportNumber, passportIssueDate, passportAuthority, rntrc) { // , passportSeries, passportNumber, passportIssueDate, passportAuthority, rntrc
    this.fullname = fullname;
    this.login = login;
    this.password = password;
    this.dob = dob;
    this.passport_series = passportSeries;
    this.passport_number = passportNumber;
    this.passport_issue_date = passportIssueDate;
    this.passport_authority = passportAuthority;
    this.rntrc = rntrc;
  }
}
