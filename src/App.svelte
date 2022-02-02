<script>
  import UserList from "./UserList.svelte"

  // Test Users
  const userList = [{ "email": "test1@api.ie", "password": "secretword"} ,{ "email": "test2@api.ie", "password": "secretword"} ]
</script>

<div class="uk-container">
  <h1> POI Client Application </h1>
  <UserList userList="{userList}"/>
</div>