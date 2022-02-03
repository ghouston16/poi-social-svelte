import axios from "axios";

export class PoiService {
  userList = [];
  poiList = [];
  baseUrl = "";
   
  // Encoded form data needed to match api 
  // https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b
  params = new URLSearchParams()

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/users")
      this.userList = await response.data;
      return this.userList;
    } catch (error) {
      return [];
    }
  }
  async getPois() {
    try {
      const response = await axios.get(this.baseUrl + "/pois");
      this.poiList = await response.data;
      console.log(response.data);
      return this.poiList;

    } catch (error) {
      return []
    }
  }
  async login(email, password) {
    // Configure headers for request
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    try {
      this.params.append("username",email);
      this.params.append("password",password);
      //console.log(this.params);
      // params and config included in payload
      const response = await axios.post(`${this.baseUrl}/login`, this.params, config);
      console.log(response);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  }
}