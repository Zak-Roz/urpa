import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  allUsers() {
    return axios.get(API_URL + 'allUsers');
  }

  findUserInDb(user) {
    // return API_URL + `findUser?passport_serias=${user.passportSeries}&rntrc=${user.rntrc}&passport_number=${user.passportNumber}&login=${user.login}&fullname=${user.fullname}`
    return axios.get(API_URL + `findUser?passport_serias=${user.passportSeries}&rntrc=${user.rntrc}&passport_number=${user.passportNumber}&login=${user.login}&fullname=${user.fullname}`);
  }

  getById(id) {
    return axios.get(API_URL + `getById?id=${id}`);
  }
  
  updatePass(user) {
    return axios.put(API_URL + 'updatePass', {
      login: user.login,
      password: user.password,
      oldPassword: user.oldPassword,
    });
  }

  update(user) {
    return axios.put(API_URL + 'update', {
      id: user.id,
      fullname: user.fullname,
      login: user.login,
      password: user.password,
      dob: user.dob,
      passport_serias: user.passport_serias,
      passport_number: user.passport_number,
      passport_issue_date: user.passport_issue_date,
      passport_authority: user.passport_authority,
      rntrc: user.rntrc,
      organization_name: user.organization_name,
      rights: user.rights,
      status_id: user.status_id,
    });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
