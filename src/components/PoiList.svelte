<script>
  import { getContext, onMount } from "svelte";
import { push } from "svelte-spa-router";
import { poi } from "../stores"

  const poiService = getContext("PoiService");
  let poiList = [];
  let message = "";

  onMount(async () => {
    poiList = await poiService.getPois();
    console.log(poiList)
  });

  async function deletePoi(poiId) {
    console.log(poiId);
    let success = await poiService.deletePoi(poiId);
    console.log(success);
    if (success) {
      poiList = await poiService.getPois();
    } else {
      message = "Error Trying to save settings";
    }
  }
  async function updatePoi(poiId) {
  console.log(poi)
  let success= await poiService.getPoiById(poiId)
  if (success){
    poi.set(success)
    push('/update')
    //console.log(success.data)
    //poi.set(success.data)
  }
  }

  async function viewPoi(poiId) {
    const candidatePoi = await poiService.getPoiById(poiId);
    if (candidatePoi){
    console.log(candidatePoi);
    poi.set(candidatePoi)
    push("/view")
    }
  }
</script>

<h3 class="uk-heading-divider">Poi List</h3>
<div class="uk-table uk-table-divider">
  <table class="uk-table">
    <thead>
      <th> Name </th>
      <th> Description </th>
    </thead>
    <tbody class="uk-text-left">
      {#each poiList as poi}
        <tr>
          <td>
            {poi.title}
          </td>
          <td>
            {poi.description}
          </td>
          <td>
            <icon
              on:click={() => viewPoi(`${poi.id}`)}
              class="far fa-folder fa-1x"
              style="color:rgb(56,191,25)"
              title="View"
            />
          </td>
          <td>
            <icon
              on:click={() => updatePoi(`${poi.id}`)}
              class="fas fa-pen-alt fa-1x"
              style="color:rgb(169,19,205)"
              title="Update"
            />
          </td>
          <td>
            <icon
              on:click={() => deletePoi(`${poi.id}`)}
              class="far fa-trash-alt fa-1x"
              style="color:rgb(220,7,55)"
              title="Delete"
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
