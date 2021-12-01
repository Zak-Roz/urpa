export default class User {
  constructor(rights, fullname, login, password, dob, passportSeries, passportNumber, passportIssueDate, passportAuthority, rntrc, organization_name) { // , passportSeries, passportNumber, passportIssueDate, passportAuthority, rntrc
    this.fullname = fullname;
    this.login = login;
    this.password = password;
    this.dob = dob;
    this.passportSeries = passportSeries;
    this.passportNumber = passportNumber;
    this.passportIssueDate = passportIssueDate;
    this.passportAuthority = passportAuthority;
    this.rntrc = rntrc;
    this.organization_name = organization_name;
    this.rights = rights;
  }
}
