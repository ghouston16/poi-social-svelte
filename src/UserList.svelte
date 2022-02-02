<script>
    //export let userList;
    import {onMount} from 'svelte'
    //import UserList from "./UserList.svelte"
    import { DonationService } from "./poi-service";
  let userList=[];
  
  const donationService = new DonationService(`http://127.0.0.1:8000`);
  onMount(async () => {
    userList = await donationService.getUsers();
  })
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
        {#if userList}  
        {#each userList as user}
          <tr>
            <td>{user.email}</td>
            <td>{user.password}</td>
          </tr>
        {/each}
        {/if}
      </tbody>
    </table>
  </div>