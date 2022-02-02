<script>
    //export let userList;
    import {getContext, onMount} from 'svelte'
    //import UserList from "./UserList.svelte"
  //  import { PoiService } from "./poi-service";
  let userList=[];

  const poiService = getContext("PoiService");
  
  onMount(async () => {
    userList = await poiService.getUsers();
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