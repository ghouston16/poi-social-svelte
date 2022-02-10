<script>
  import { setContext } from "svelte";
  import {PoiService} from "./poi-service";
  import Users from "./pages/Users.svelte";
  import Pois from "./pages/Pois.svelte";
  import Navigator from "./components/Navigator.svelte";
  import Router from "svelte-spa-router";
import Main from "./pages/Main.svelte";
import Login from "./pages/Login.svelte";
import Create from "./pages/Create.svelte";
import Signup from "./pages/Signup.svelte";

  setContext("PoiService", new PoiService("http://127.0.0.1:8000"));

  let routes = {
    "/": Main,
    "/login": Login,
    "/users": Users,
    "/pois": Pois,
    "/logout": Main,
    "/create": Create,
    "/signup": Signup
  }
</script>

<div class="uk-container">
  <h1> POI Client Application </h1>
  <Navigator/>
  <Router {routes} />
</div>