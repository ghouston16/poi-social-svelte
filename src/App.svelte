<script>
  import UserList from "./UserList.svelte"
  import { setContext } from "svelte";
  import {PoiService} from "./poi-service";
  import PoiList from "./PoiList.svelte"

  setContext("PoiService", new PoiService("http://127.0.0.1:8000"));
</script>

<div class="uk-container">
  <h1> POI Client Application </h1>
  <UserList/>
  <PoiList/>
</div>