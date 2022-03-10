import axios from "axios";
import { push } from "svelte-spa-router";
import { intros } from "svelte/internal";
import { user, poi } from "./stores";

export class PoiService {
  userList = [];
  poiList = [];
  baseUrl = "";
  

  // Encoded form data needed to match api 
  // https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b
  params = new URLSearchParams()

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    if (localStorage.poi) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.poi);
    }
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
      //  console.log(response.data);
        user.set({
          email: email,
          token: response.data.access_token
        });
        localStorage.poi = JSON.stringify(response.data.access_token)
        //console.log(localStorage.user)
        return true;
      }
        else 
        return false;
    } catch (error) {
      return false;
    }
  }
  
    // Sign Up
    async signup(email, password) {
      try {
        const storedPassword = password;
        const userDetails = {
          email: email,
          password:  password //hash,
        };
        console.log(userDetails);
        const response = await axios.post(this.baseUrl + "/users", userDetails);
        const newUser = await response.data;
        user.set(newUser);
        return true;
      } catch (error) {
        return false;
      }
    }
  

  async createPoi(title, description, category, lat, lng) {
    let creator;
    try {
      const res = await axios.get(this.baseUrl + "/users");
      this.userList = res.data
     // console.log(this.userList)
      for (let i=0;i < this.userList.length; i++ ){
        if (this.userList[i].email == localStorage.user){
           creator = this.userList[i].id
         //  console.log(creator)
        }
      }
      const poi = {
        title: title,
        description: description,
        category: category,
        lat: lat,
        lng: lng,
        creator: creator
      };

      const response = await axios.post(this.baseUrl + "/pois", poi);
      if (response.status == 201){
        push("/pois");
      }
    } catch (error) {
      return false;
    }

  }
  async deletePoi(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/pois/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
  async updatePoi(title, description, category, lat, lng, id, creator) {
    try {
      const poiDetails = {
        title: title,
        description: description,
        category: category,
        lat: lat,
        lng: lng,
        id: id,
        creator: creator
      };

      console.log(poiDetails);
      const response = await axios.put(this.baseUrl + "/pois/" + id, poiDetails);
      const newPoi = await response.data;
      console.log(response);
      poi.set(newPoi);
      return true;
    } catch (error) {
      return false;
    }
  }
  async getPoiById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/pois/${id}`)
      //console.log(response)
      const poi = await response.data;
      //console.log(poi)
      return poi;
    } catch (error) {
      return null;
    }
  }
  
}