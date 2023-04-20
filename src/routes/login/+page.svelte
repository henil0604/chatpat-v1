<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import isLoggedIn from "@/utils/isLoggedIn";
    import { signIn } from "@auth/sveltekit/client";

    import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-svelte";

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

<div class="flex-center flex-col min-h-screen gap-2">
    <button
        on:click={() => signIn("github")}
        class="btn bg-slate-950 flex gap-2 justify-center items-center"
        ><IconBrandGithub /> Login with Github</button
    >
    <button
        on:click={() => signIn("google")}
        class="btn bg-white hover:bg-gray-100 text-black border flex gap-2 justify-center items-center"
        ><IconBrandGoogle /> Login With Google</button
    >
</div>
