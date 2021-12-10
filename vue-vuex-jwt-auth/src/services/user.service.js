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
