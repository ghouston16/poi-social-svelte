<script lang="ts">
    import {getContext} from "svelte";
    import {user} from "../stores";
    import { push } from "svelte-spa-router";
    let email = $user.email;
    let password = "";
    let message = "";
    
  
    const poiService = getContext("PoiService");
  
    async function save() {
        user.set($user);
      let success = await poiService.updateSettings(email, password, $user.email)
      if (success) {
        message = "Settings updated";
      } else {
        message = "Error Trying to save settings";
      }
    }
    async function removeAccount() {
      let success = await poiService.deleteUser(email)
      if (success) {
        push('/signup');
      } else {
        message = "Error Trying to save settings";
      }
    }
    async function logout() {
      let success = await poiService.logout()
      if (success) {
        push('/login');
      } else {
        message = "Error Trying to save settings";
      }
    }
  </script>
  
  <form on:submit|preventDefault={save}>
    <div class="uk-margin uk-text-left">
      <div class="uk-margin">
        <label class="uk-form-label">Email</label>
        <div class="uk-inline uk-width-1-1">
          <div class="uk-form-controls">
            <input class="uk-input" id="form-stacked-text" type="text" value={email} disabled/>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-label">Password</label>
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: lock"></span>
            <input bind:value={password} class="uk-input uk-form-large" type="password" name="password">
          </div>
        </div>
      </div>
    </div>
    <div class="uk-margin">
      <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Save Settings</button>
    </div>
    {#if message}
      <div class="uk-text-left uk-text-small">
        {message}
      </div>
    {/if}
  </form>
  <div class="uk-margin">
    <button on:click={removeAccount} class="uk-button uk-button-danger uk-button-large uk-width-1-1">Delete Account </button>
  </div>
  <div class="uk-margin">
    <button on:click={logout} class="uk-button uk-button-danger uk-button-large uk-width-1-1">Log Out </button>
  </div>