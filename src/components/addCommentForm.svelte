<script lang="ts">
    import "leaflet/dist/leaflet.css";
    import App from "../App.svelte";
    import { poi, user } from "../stores";
    import { onMount, getContext } from "svelte";
    import { push } from "svelte-spa-router";
    const poiService = getContext("PoiService");

    let errorMessage = "";
    let comment = "";
    let map;

    onMount(async () => {});
    async function createComment() {
        const success = await poiService.createComment(comment, $poi.id, $user.email);

        if (success) {
            poi.set($poi)
            user.set(localStorage.poi)
            push("/view")
        } else {
            errorMessage = "Poi not completed - some error occurred";
        }
    }
</script>

<form on:submit|preventDefault={createComment} class="uk-form-stacked uk-text-left">
    <h3 class="uk-heading-divider uk-text-center">Leave a Comment...</h3>
    <div class="uk-grid uk-grid-stack">
        <div class="uk-width-1@m">
            <div class="uk-margin">
                <div class="uk-form-controls">
                    <input
                        bind:value={comment}
                        class="uk-input"
                        id="form-stacked-text"
                        type="string"
                        name="comment"
                        placeholder="Your Comment..."
                    />
                </div>
            </div>
        </div>
        <div class=" uk-width-1@m">
            <div class="uk-margin">
                <div></div>
                <button
                    class="submit uk-button uk-button-primary uk-button-small"
                    >Add</button
                >
            </div>
        </div>
        {#if errorMessage}
            <div class="uk-text-left uk-text-small">
                {errorMessage}
            </div>
        {/if}
    </div>
</form>
