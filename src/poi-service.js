import axios from "axios";
import { push } from "svelte-spa-router";
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
  async login(email, password) {
    // Configure headers for request
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    try {
      this.params.append("username", email);
      this.params.append("password", password);
    
      // params and config included in payload
      const response = await axios.post(`${this.baseUrl}/login`, this.params, config);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;
      //console.log(response.status);
     // console.log(response.data);
      if (response.data.status = 200) {
        console.log(response.status);
        console.log(response.data);
        user.set({
          email: email,
          token: response.data.access_token
        });
        localStorage.poi = JSON.stringify(response.data.access_token)
    
        return true;
      }
        else 
        return false;
    } catch (error) {
      return false;
    }
  }

  

  async createPoi(title, description, category, lat, lng) {
    try {
      // const creator = 
      const poi = {
        title: title,
        description: description,
        category: category,
        lat: lat,
        lng: lng,
      };

      const response = await axios.post(this.baseUrl + "/pois", poi);
      if (response.status == 201){
        push("/pois");
      }
    } catch (error) {
      return false;
    }

  }
}