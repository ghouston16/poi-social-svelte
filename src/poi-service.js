export class DonationService {
  userList = [];
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
}