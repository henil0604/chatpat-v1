<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import isLoggedIn from "@/utils/isLoggedIn";
    import { signIn } from "@auth/sveltekit/client";

    import { IconBrandGithub } from "@tabler/icons-svelte";

    if(isLoggedIn($page)){
      const url = $page.url.searchParams.get("redirectTo") || "/";
      goto(url);
    }
</script>

<div class="flex-center min-h-screen">
    <button
        on:click={() =>
            signIn("github", {
                callbackUrl: $page.url.searchParams.get("redirectTo") || "/",
            })}
        class="btn bg-slate-950 flex gap-2 justify-center items-center"
        ><IconBrandGithub /> Login with Github</button
    >
</div>
