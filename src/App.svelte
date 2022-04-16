<script>
  import { setContext } from "svelte";
  import { PoiService } from "./poi-service";
  import Pois from "./pages/Pois.svelte";
  import Navigator from "./components/Navigator.svelte";
  import Router from "svelte-spa-router";
  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Create from "./pages/Create.svelte";
  import Signup from "./pages/Signup.svelte";
  import UpdatePoi from "./pages/UpdatePoi.svelte";
  import PoiView from "./pages/PoiView.svelte";
  import Settings from "./pages/Settings.svelte";

  setContext(
    "PoiService",
    new PoiService("https://python-poi-api.herokuapp.com")
  );

  let routes = {
    "/": Main,
    "/login": Login,
    // "/users": Users,
    "/pois": Pois,
    "/logout": Main,
    "/create": Create,
    "/signup": Signup,
    "/update": UpdatePoi,
    "/view": PoiView,
    "/settings": Settings,
  };
</script>

<div class="uk-container">
  <Navigator />
  <Router {routes} />
</div>
