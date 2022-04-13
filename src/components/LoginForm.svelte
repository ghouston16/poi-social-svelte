<script>
  import { push } from "svelte-spa-router";
  import {getContext} from "svelte";
  import tricolor from "/src/assets/ireland-flag.jpg"
  const poiService = getContext("PoiService");

  let email = ""
  let password = "";
  let errorMessage = "";

  async function login() {
    //console.log(email, "+", password);
    let success = await poiService.login(email, password)
    if (success) {
      push("/pois");
    } else {
      email = "";
      password = "";
      errorMessage = "Invalid Credentials";
    }
  }
  </script>
  

  <form on:submit|preventDefault={login}>
    <div class="uk-margin uk-text-left">
      <h3 class="uk-label">Email</h3>
      <div class="uk-inline uk-width-1-1">
        <span class="uk-form-icon" uk-icon="icon: mail"></span>
        <input bind:value={email} class="uk-input uk-form-large" type="text" name="email">
      </div>
    </div>
    <div class="uk-margin">
      <div class="uk-inline uk-width-1-1">
        <span class="uk-form-icon" uk-icon="icon: lock"></span>
        <input bind:value={password} class="uk-input uk-form-large" type="password" name="password">
      </div>
    </div>
    <div class="uk-margin">
      <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Login</button>
    </div>
    {#if errorMessage}
      <div class="uk-text-left uk-text-small">
        {errorMessage}
      </div>
    {/if}
  </form>