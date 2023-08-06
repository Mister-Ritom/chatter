<script>
	import { pb } from "$lib/pocketbase";

    /**
	 * @type {any}
	 */
     export let user

     function getImageUrl() {
        return pb.files.getUrl(user, user.avatar, {'thumb': '100x250'});
    }

</script>

<div class={"user"}>
    <img width="48px" height="48px" src={getImageUrl()} alt={`${user.name}'s Profile Photo'`} class="user-image">
    <h2 class="user-name">{user.name}</h2> 
</div>

<style>
    .user {
        margin-right: auto;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .user-name {
        margin-left: 1rem;
    }
    .user-image {
        border-radius: 50%;
    }
</style>