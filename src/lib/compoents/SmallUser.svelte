<script>
	import { db } from "$lib/firebase";
	import { doc, getDoc } from "firebase/firestore";

    export let userId;

    /**
	 * @type {any}
	 */
    let user = {
        name:"Working",
        photoUrl:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreeiconshop.com%2Ficon%2Fimage-icon-outline-filled%2F&psig=AOvVaw3aWyZLTrzYXGUNwJN2DQcM&ust=1691210333046000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiXpMuXwoADFQAAAAAdAAAAABAE",
    };

    const userDoc = doc(db,"Users",userId)
    getDoc(userDoc).then((userSnapshot)=> {
        const data = userSnapshot.data()
        user = data
    })

</script>

<div class={"user"}>
    <img width="48px" height="48px" src={user.photoUrl} alt={`${user.name}'s Profile Photo'`} class="user-image">
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