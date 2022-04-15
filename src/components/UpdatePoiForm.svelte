<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { poi, user } from "../stores";
    import { push } from "svelte-spa-router";

    let title = $poi.title;
    let description = $poi.description;
    let lat = $poi.lat;
    let lng = $poi.lng;
    let category = $poi.category;
    let id = $poi.id
    let message = "";
    let categoryList = [];
    let selectedCategory = 0;

    const poiService = getContext("PoiService");

    onMount(async () => {
        const candidatePoi = await poiService.getPoiById($poi.id);

        console.log(candidatePoi);
    });

    async function save() {
        //  const candidatePoi = await poiService.getPoiById($poi.id);
        let success = await poiService.updatePoi(
            title,
            description,
            category,
            lat,
            lng,
            id,
            $poi.creator
        );
        
        if (success) {
            message = "Settings updated";
        } else {
            message = "Error Trying to save settings";
        }
    }

    async function removePoi() {
        let success = await poiService.deletePoi($poi.id);
        if (success) {
            push("/pois");
        } else {
            message = "Error Trying to save settings";
        }
    }
</script>

<form on:submit|preventDefault={save}>
    <div class="uk-margin uk-text-left">
        <div class="uk-margin">
            <h3 class="uk-form-label">Name</h3>
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: user" />
                <input
                    bind:value={title}
                    class="uk-input uk-form-large"
                    type="string"
                    name="name"
                    placeholder={$poi.title}
                />
            </div>
        </div>
        <div class="uk-margin">
            <h3 class="uk-form-label">Description</h3>
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: user" />
                <input
                    bind:value={description}
                    class="uk-input uk-form-large"
                    type="string"
                    name="description"
                    placeholder={$poi.description}
                />
            </div>
        </div>
        <h3 class="uk-form-label">Latitude</h3>
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: location" />
            <input
                bind:value={lat}
                class="uk-input uk-form-large"
                type="string"
                name="lat"
                placeholder={$poi.lat}
            />
        </div>
        <div class="uk-margin">
            <h3 class="uk-form-label">Longitude</h3>
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: location" />
                <input
                    bind:value={lng}
                    class="uk-input uk-form-large"
                    type="text"
                    name="long"
                    placeholder={$poi.lng}
                />
            </div>
            <div class=" uk-width-1-2@m">
                <div class=" uk-width-1-2@m">
                    <div class="uk-margin uk-text-left">
                        <div class="uk-form-label">Select Category</div>
                        <div class="uk-form-controls ">
                            <h3>
                                <input
                                    bind:value={category}
                                    class="uk-input"
                                    type="string"
                                    name="category"
                                />
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="uk-margin">
            <button
                class="uk-button uk-button-primary uk-button-large uk-width-1-1"
                >Save Settings</button
            >
        </div>
        {#if message}
            <div class="uk-text-left uk-text-small">
                {message}
            </div>
        {/if}
    </div>
</form>
<div class="uk-margin">
    <button
        on:click={removePoi}
        class="uk-button uk-button-danger uk-button-large uk-width-1-1"
        >Delete
    </button>
</div>
