<script>
    import {title, subTitle, navBar, welcomeBar} from "../stores"
    import homer2 from "/src/assets/ireland-flag.jpg";
    title.set("Poi Tracker");
    subTitle.set("Sign up or Log in");
  
    navBar.set({
      bar: welcomeBar
    });
  </script>
  
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-1-2@m">
      <img width="200" src="{homer2}" alt="homer">
      <p>  </p>
    </div>
    <div class="uk-width-1-2@m ">
      <div class="uk-width-2xlarge">
        <h3 class="uk-heading-small uk-flex"> Track your POIs</h3>
        <p> Login or Signup to Continue </p>
      </div>
    </div>
  </div>