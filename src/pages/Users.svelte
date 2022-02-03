<script>
    import UserList from "../components/UserList.svelte";
    import homer4 from "/src/assets/ireland-flag.jpg";
    import {navBar, mainBar, subTitle, title} from "../stores"
  
    title.set("POI Tracker Inc.");
    subTitle.set("All Current Users");
    navBar.set({
      bar: mainBar
    });
  </script>
  
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-1-2@m ">
      <img width="300" src="{homer4}" alt="homer">
    </div>
    <div class="uk-width-1-2@m">
      <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge ">
        <UserList/>
      </div>
    </div>
  </div>