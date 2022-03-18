<script>
    import { getContext, onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { poi } from "../stores";

    const poiService = getContext("PoiService");
    let commentList = [];
    let message = "";
    //let commentsPoi = JSON.parse(localStorage.poi);

    onMount(async () => {
        console.log(poi);
        commentList = await poiService.getPoiComments($poi.id);
        //console.log(commentList);
    });

    async function deleteComment(commentId) {
        console.log(commentId);
        let success = await poiService.deleteComment($poi.id,commentId);
        console.log(success);
        if (success) {
            poi.set($poi)
            commentList = await poiService.getPoiComments($poi.id);
            //push('/view')
        } else {
            message = "Error Trying to save settings";
        }
    }
    async function updateComment(commentsId) {
        console.log(poi);
        let success = await poiService.getPoiById(commentsId);
        if (success) {
            poi.set(success);
            push("/update");
            //console.log(success.data)
            //poi.set(success.data)
        }
    }
    //TODO: fix this route
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
                            on:click={() => viewComment(`${comment.id}`)}
                            class="far fa-folder fa-1x"
                            style="color:rgb(56,191,25)"
                            title="View"
                        />
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
