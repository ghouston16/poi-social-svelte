<script>
  import UserList from "./components/UserList.svelte"
  import { setContext } from "svelte";
  import {PoiService} from "./poi-service";
  import PoiList from "./components/PoiList.svelte"
  import Users from "./pages/Users.svelte";
  import Pois from "./pages/Pois.svelte";

  setContext("PoiService", new PoiService("http://127.0.0.1:8000"));
</script>

<div class="uk-container">
  <h1> POI Client Application </h1>
  <Users/>
  <Pois/>
</div>