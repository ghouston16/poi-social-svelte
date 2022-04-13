import axios from "axios";
import { push } from "svelte-spa-router";
//import { intros } from "svelte/internal";
import { user, poi, comment } from "./stores";

export class PoiService {
  userList = [];
  poiList = [];
  baseUrl = "";

  

  // Encoded form data needed to match api 
  // https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b
  params = new URLSearchParams()

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    if (localStorage.jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.jwt);
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
        localStorage.jwt = JSON.stringify(response.data.access_token)
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
  

  async createPoi(title, description, category, lat, lng, user_email) {
    let creator = 0;
    try {
      const res = await axios.get(this.baseUrl + "/users");
      this.userList = res.data
     // console.log(this.userList)
      for (let i=0;i < this.userList.length; i++ ){
        if (this.userList[i].email == user_email){
           creator = this.userList[i].id
           console.log(creator)
        }
      }
      const poi = {
        title: title,
        description: description,
        lat: lat,
        lng: lng,
        creator: creator,
        category: category,
      };
      console.log(poi);
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
  
  async createComment(comment_string, poi_id, user_email) {
    let creator;
    //let poi_id = localStorage.jwt.id;
    try {
      const res = await axios.get(this.baseUrl + "/users");
      this.userList = res.data
     // console.log(this.userList)
      for (let i=0;i < this.userList.length; i++ ){
        if (this.userList[i].email == user_email){
           creator = this.userList[i].id
           console.log(creator)
        }
      }
      const comment = {
        comment: comment_string,
        creator: creator,
        poi_id: poi_id
      };
      console.log(comment)
      const response = await axios.post(this.baseUrl + `/pois/${poi_id}/comments`, comment);
      if (response.status == 201){
        return true
      }
    } catch (error) {
      return false;
    }
  }

  async deleteComment(poi_id, id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/pois/${poi_id}/comments/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateComment(comment_string, id, poi_id ) {
    let creator;
    //let poi_id = localStorage.jwt.i
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
      const commentDetails = {
        id: id,
        comment: comment_string,
        creator: creator,
        poi_id: poi_id
      };

      console.log(commentDetails);
      const response = await axios.put(this.baseUrl + "/pois/" + poi_id + "comments/" + id, commentDetails);
      const newComment = await response.data;
      console.log(response);
      comment.set(newComment);
      return true;
    } catch (error) {
      return false;
    }
  }
  async getPoiComments(poi_id) {
    try {
      const response = await axios.get(`${this.baseUrl}/pois/${poi_id}/comments`)
      //console.log(response)
      const commentList = await response.data;
      //console.log(poi)
      return commentList;
    } catch (error) {
      return null;
    }
  }
  async getCommentById(poi_id, id) {
    try {

      const response = await axios.get(`${this.baseUrl}/pois/${poi_id}/comments/${id}`)
      //console.log(response)
      const comment = await response.data;
      //console.log(poi)
      return comment;
    } catch (error) {
      return null;
    }
  }
  
}

