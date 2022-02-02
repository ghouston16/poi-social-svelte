export class PoiService {
  userList = [];
  poiList = [];
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await fetch(this.baseUrl + "/users")
      this.userList = await response.json();
      return this.userList;
    } catch (error) {
      return [];
    }
  }
  async getPois() {
    try {
      const response = await fetch(this.baseUrl + "/pois");
      this.poiList = await response.json();
      return this.poiList

    } catch (error) {
      return []
    }
  }
}