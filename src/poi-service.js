import axios from "axios";
import { user } from "./stores";

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

  async createPoi(title, description, category, lat, long) {
      try {
       // const creator = 
        const poi = {
          title: title,
          description: description,
          category: category,
          lat: lat,
          lng: long,
        };
        //const cat = await axios.get(this.baseUrl + '/api/categories')
       // console.log(poi);
       const response = await axios.post(this.baseUrl + "/pois", poi);
       console.log(response.status)
       // const response = await axios.post(this.baseUrl + "/api/categories/" + category._id + "/pois", poi);
        return response.status == 201;
      } catch (error) {
        return false;
      }
    }
  

  async login(email, password) {
    // Configure headers for request - https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b
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
      user.set({"email": email, "token":response.data.access_token});
      console.log(response);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  }
}