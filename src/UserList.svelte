<script>
    export let userList;
  </script>
  
  <h3 class="uk-heading-divider">
    User List </h3>
  <div class="uk-table uk-table-divider">
    <table class="uk-table">
      <thead>
        <th>
          Email
        </th>
        <th>
            Password
          </th>
      </thead>
      <tbody class="uk-text-left">
        {#each userList as user}
          <tr>
            <td>{user.email}</td>
            <td>{user.password}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>