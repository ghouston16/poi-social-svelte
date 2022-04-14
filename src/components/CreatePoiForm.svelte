<script lang="ts">
    import { user } from '../stores';
    import { onMount, getContext } from "svelte";
    import {push} from 'svelte-spa-router';
    const poiService = getContext("PoiService");

    let categoryList = ["North","South","East","West"];
    let lat = "";
    let lng = "";
    let creator = "";
    let name = "";
    let description = "";
    let selectedMethod = 0;
    let selectedCategory = 0;
    let categories = ["North", "South", "East", "West"];
    let errorMessage = "";
    let category = "";
    let title = "";
    let image = "";
    //let creator = ""
    let map;

    onMount(async () => {
    });
    async function createPoi() {
        const success = await poiService.createPoi(title, description,category,lat,lng, $user)
        
        if (success) {
            push('/pois')
        } else {
            errorMessage = "Poi not completed - some error occurred";
        }
    }
</script>

<form on:submit|preventDefault={createPoi} class="uk-form-stacked uk-text-left">
    <h3 class="uk-heading-divider uk-text-center">
        Add a POI </h3>
    <div class="uk-grid uk-grid-stack">
        <div class="uk-width-1@m">
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Name</label
                >
                <div class="uk-form-controls">
                    <input
                        bind:value={title}
                        class="uk-input"
                        id="form-stacked-text"
                        type="string"
                        name="name"
                        placeholder="POI Name"
                    />
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text"
                    >Enter Description</label
                >
                <div class="uk-form-controls">
                    <input
                        bind:value={description}
                        class="uk-input"
                        id="form-stacked-text"
                        type="string"
                        name="description"
                        placeholder="Description"
                    />
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text"
                    >Poi Latitude</label
                >
                <div class="uk-form-controls">
                    <input
                        bind:value={lat}
                        class="uk-input"
                        id="form-stacked-text"
                        type="string"
                        name="long"
                        placeholder="Latitude"
                    />
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text"
                    >Poi Longitude</label
                >
                <div class="uk-form-controls">
                    <input
                        bind:value={lng}
                        class="uk-input"
                        id="form-stacked-text"
                        type="string"
                        name="long"
                        placeholder="Longitude"
                    />
                </div>
        <div class=" uk-width-1-2@m">
            <div class="uk-margin uk-text-left">
                <div class="uk-form-label">Select Category</div>
                <div class="uk-form-controls ">
                        <label>
                            <input
                                bind:value={category}
                                class="uk-input"
                                type="string"
                                name="category"
                            />
                    
                        </label>
                </div>
            </div>
            <div class=" uk-width-1@m">
            <div class="uk-margin">
                <button
                    class="submit uk-button uk-button-primary uk-button-xlarge uk-width-1-1"
                    >Create</button
                >
            </div>
            </div>
            {#if errorMessage}
                <div class="uk-text-left uk-text-small">
                    {errorMessage}
                </div>
            {/if}
        </div>
    </div>
</form>
