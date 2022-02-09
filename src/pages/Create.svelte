<script>
    import homer from "/src/assets/ireland-flag.jpg";
    import {navBar, mainBar, subTitle, title} from "../stores"
    import CreatePoiForm from "../components/CreatePoiForm.svelte";
  
    title.set("Poi Tracker Inc.");
    subTitle.set("Add a Poi!");
    navBar.set({
      bar: mainBar
    });
  </script>
  
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-1-2@m ">
      <img width="300" src="{homer}" alt="homer">
    </div>
    <div class="uk-width-1-2@m ">
      <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge ">
        <CreatePoiForm/>
      </div>
    </div>
  </div>