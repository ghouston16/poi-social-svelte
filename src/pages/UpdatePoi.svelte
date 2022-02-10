<script lang="ts">
    import {mainBar, navBar, subTitle, title} from "../stores";
    import homer from "/src/assets/ireland-flag.jpg";
    import UpdatePoiForm from "../components/UpdatePoiForm.svelte";
  
    title.set("Poi Tracker Inc");
    subTitle.set("Update POI");
  
    navBar.set({
      bar: mainBar
    });
  </script>
  
  <div class="uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-width-1-2@m ">
      <img width="300" src="{homer}" alt="homer">
    </div>
    <div class="uk-width-1-2@m">
      <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge">
        <h3 class="uk-card-title uk-text-center">Update POI Details:</h3>
        <UpdatePoiForm/>
      </div>
    </div>
  </div>
  