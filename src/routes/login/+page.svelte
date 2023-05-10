<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { APP_NAME } from "@/const";
    import isLoggedIn from "@/utils/isLoggedIn";
    import { signIn } from "@auth/sveltekit/client";
    import Icon from "@iconify/svelte";

    const url = $page.url.searchParams.get("redirectTo") || "/";

    if (isLoggedIn($page)) {
        goto(url);
    }

    const login = (method: string) => {
        signIn(method, {
            callbackUrl: url,
        });
    };
</script>

<svelte:head>
    <title>{APP_NAME} - Login</title>
</svelte:head>

<div class="flex-center flex-col min-h-screen">
    <div class="card p-4 flex-center flex-col gap-3">
        <button
            on:click={() => signIn("github")}
            class="btn bg-slate-950 flex gap-2 justify-center items-center"
            ><Icon icon="mdi:github" /> Login with Github</button
        >
        <button
            on:click={() => signIn("google")}
            class="btn bg-white hover:bg-gray-100 text-black border flex gap-2 justify-center items-center"
            ><Icon icon="mdi:google" /> Login With Google</button
        >
    </div>
</div>
