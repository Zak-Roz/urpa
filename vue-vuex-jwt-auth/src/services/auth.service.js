import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        login: user.login,
        // fullname: user.fullname,
        password: user.password,
        // dob: user.dob,
        // passport_series: user.passportSeries,
        // passport_number: user.passportNumber,
        // passport_issue_date: user.passportIssueDate,
        // passport_authority: user.passportAuthority,
        // rntrc: user.rntrc,
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      fullname: user.fullname,
      login: user.login,
      // password: user.password,
      dob: user.dob,
      passportSeries: user.passportSeries,
      passportNumber: user.passportNumber,
      passportIssueDate: user.passportIssueDate,
      passportAuthority: user.passportAuthority,
      rntrc: user.rntrc,
      organization_name: user.organization_name.organization_name,
      rights: user.rights,
    });
  }
}

export default new AuthService();
