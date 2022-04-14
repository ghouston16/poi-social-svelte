<script>
    import { getContext, onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { poi, user } from "../stores";
    //import AddCommentForm from "./addCommentForm.svelte";

    const poiService = getContext("PoiService");
    let commentList = [];
    let message = "";
    let comment = "";
    let errorMessage = "";

    //let commentsPoi = JSON.parse(localStorage.poi);

    onMount(async () => {
        console.log(poi);
        commentList = await poiService.getPoiComments($poi.id);
        //console.log(commentList);
    });

    async function createComment() {
        const success = await poiService.createComment(
            comment,
            $poi.id,
            $user.email
        );

        if (success) {
            poi.set($poi);
            commentList = await poiService.getPoiComments($poi.id);
            return commentList;
        } else {
            errorMessage = "Poi not completed - some error occurred";
        }
    }

    async function deleteComment(commentId) {
        //console.log(commentId);
        let success = await poiService.deleteComment($poi.id, commentId);
        // console.log(success);
        if (success) {
            poi.set($poi);
            commentList = await poiService.getPoiComments($poi.id);
            //push('/view')
        } else {
            message = "Error Trying to save settings";
        }
    }
    // TODO: fix this method
    async function updateComment(comment_string, commentsId, poi_id) {
        let success = await poiService.getCommentById(poi_id, commentsId);
        if (success) {
            poi.set(success);
            let response = await poiService.updateComment(
                comment_string,
                commentsId,
                poi_id
            );
            if (response.data.comment == comment_string) {
                push("/view");
                //push("/update");
                //console.log(success.data)
                //poi.set(success.data)
            }
        } else {
            message = "Error Trying to save settings";
        }
    }
    //TODO: fix/remove this route
    async function viewComment(poiId) {
        const candidatePoi = await poiService.getPoiById(poiId);
        if (candidatePoi) {
            console.log(candidatePoi);
            poi.set(candidatePoi);
            push("/view");
        }
    }
</script>

<div class="uk-table uk-table-divider">
    <table class="uk-table">
        <thead>
            <th> Comment </th>
            <th> Creator </th>
            <th> Created </th>
        </thead>
        <tbody class="uk-text-left">
            {#each commentList as comment}
                <tr>
                    <td>
                        {comment.comment}
                    </td>
                    <td>
                        {comment.owner.email}
                    </td>
                    <td>
                        {comment.created_at}
                    </td>
                    <td>
                        <icon
                            on:click={() => updateComment(`${comment.id}`)}
                            class="fas fa-pen-alt fa-1x"
                            style="color:rgb(169,19,205)"
                            title="Update"
                        />
                    </td>
                    <td>
                        <icon
                            on:click={() => deleteComment(`${comment.id}`)}
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

<form
    on:submit|preventDefault={createComment}
    class="uk-form-stacked uk-text-left"
>
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
                <div />
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
