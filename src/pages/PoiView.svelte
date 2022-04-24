<script>
  // import PoiComments from '/src/components/PoiComments.svelte';
   import PoiCommments from '/src/components/PoiCommments.svelte';
   import {getContext, onMount} from 'svelte'
   import {push} from 'svelte-spa-router'
   import {poi} from '../stores'
   import spike from "/src/assets/spikeisland2.jpg"
   //import App from 'src/App.svelte';
   const poiService = getContext("PoiService");
   let message = "";
   //import {push} from 'svelte-spa-router'

   onMount(async () => {
    const showPoi = await poiService.getPoiById($poi.id);
    //const category_name = await poiService
     console.log(showPoi);
   });

   // comment for demo
   async function deletePoi(poiId) {
   console.log(poiId); 
   //poiawait poiService.getPoiById(poiId)
   let success = await poiService.deletePoi(poiId)
   if (success) {
     //const poiList = await poiService.getPois()
     push("/pois")
    // const poiList = await poiService.get()
   } else {
     message = "Error Trying to save settings";
   }
 }
   async function updatePoi(poiId){
     console.log(poiId); 
     const candidatePoi = await poiService.getPoiById(poiId);
     poi.set(candidatePoi)
     console.log(poi)
     let success= await poiService.getPoiById(poiId)
     if (success){
       push('/updatepoi')
       //console.log(success.data)
       //poi.set(success.data)
   }
   }
 </script>
<div class="uk-margin uk-width-1xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
   <h3 class="uk-heading-divider">
       {$poi.title} </h3>
       <div class="uk-image-center-width-1-2@m ">
        <img width="300" src="{spike}" alt="homer">   <img width="300" src="{spike}" alt="homer">  <img width="300" src="{spike}" alt="homer">
      </div>
   <table class="uk-table">
       <thead>
       <th>Name</th>
       <th>Category</th>
       <th>Latitude</th>
       <th>Longitude</th>
       <th></th>
       <th></th>
       </thead>
       <tbody class="uk-text-left">
       <tr>
           <td>
               {$poi.title}
           </td>
           <td>
               {$poi.category}
           </td>
           <td>
               {$poi.lat}
           </td>
           <td>
               {$poi.lng}
           </td>
           <td>
               <icon on:click={() => updatePoi( $poi.id)} class="fas fa-pen-alt fa-1x" style="color:rgb(169,19,205)" title="Update"> </icon></td>
           <td>
               <icon on:click={() => deletePoi($poi.id)} class="fas fa-trash-alt fa-1x" style="color:rgb(220,7,55)" title="Delete"> </icon></td>
       </tr>
       </tbody>

   </table>
</div>
<div class="uk-margin uk-width-1xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
 <h3 class="uk-heading-divider">
     {$poi.title} Comments </h3>
     <PoiCommments />
</div>