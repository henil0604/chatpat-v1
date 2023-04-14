<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";

    $: user = $page.data.user;
</script>

<div>
    <input type="checkbox" id="account-modal" class="modal-toggle" />
    <label for="account-modal" class="modal text-black cursor-pointer">
        <div class="modal-box relative min-w-fit max-w-full cursor-default">
            <label
                for="account-modal"
                class="btn btn-sm btn-circle absolute right-4 top-4">✕</label
            >
            <h3 class="font-bold text-lg">{user.name}</h3>
            <hr class="my-3" />
            <div class="flex gap-5 max-sm:flex-col max-sm:items-center">
                <div class="avatar">
                    <div class="w-48 rounded-full">
                        <img src={user.image} alt="" />
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <div>
                        <span class="font-bold">Name: </span>
                        <span class="">{user.name}</span>
                    </div>
                    <div>
                        <span class="font-bold">Email: </span>
                        <span class="">{user.email}</span>
                    </div>
                    <button
                        class="btn btn-error w-fit mt-5"
                        on:click={() => signOut()}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </label>

    <label
        for="account-modal"
        class="btn bg-white border-none h-fit py-2 text-black hover:bg-gray-100 shadow-lg gap-3"
    >
        <div class="avatar">
            <div class="w-12 rounded-full">
                <img src={user.image} alt="" />
            </div>
        </div>
        <span class="text-base">Account</span>
    </label>
</div>
