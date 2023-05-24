<script lang="ts">
    import { page } from "$app/stores";
    import { CODE, REGEX } from "@/const";
    import { loading } from "@/store";
    import { minLength, pattern, required, useForm } from "svelte-use-form";
    import { debounce } from "lodash-es";
    import isUsernameValid from "@/utils/isUsernameValid";
    import { ProgressRadial, toastStore } from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
    import setUsername from "@/utils/setUsername";
    import { goto } from "$app/navigation";
    import sleep from "@/utils/sleep";
    import { onMount } from "svelte";

    const redirectTo = $page.url.searchParams.get("redirectTo") || "/dashboard";

    const user = $page.data.user;

    let isUnameValid = false;
    let isUnameBeingChecked = false;

    const form = useForm({
        username: {
            initial: user?.name.toLowerCase().split(" ").join(".") || "",
            validators: [minLength(2), required, pattern(REGEX.alphanumeric)],
        },
    });

    onMount(() => {
        loading.set(false);
    });

    async function handleSubmit() {
        if (!$form.valid) return;

        loading.set(true);
        if (!(await isUsernameValid($form.username.value))) {
            toastStore.trigger({
                message: "Username is already taken",
                background: "variant-filled-error",
            });
            loading.set(false);
            return;
        }

        // Set Username
        const setUsernameResponse = await setUsername($form.username.value);

        if (setUsernameResponse.code !== CODE.DONE) {
            toastStore.trigger({
                message: setUsernameResponse.message,
                background: "variant-filled-error",
            });
            return loading.set(false);
        }

        goto(redirectTo);
    }

    const checkUsername = debounce(async (event: any) => {
        const username = event.target.value;

        if (username.trim() === "") return;

        isUnameBeingChecked = true;
        isUnameValid = await isUsernameValid(username);
        isUnameBeingChecked = false;
    }, 500);
</script>

{#if user}
    <div class="w-full h-full flex justify-center pt-10 max-md:p-0">
        <div
            class="w-fit h-fit max-md:h-full card flex items-center flex-col p-4 max-w-[600px] max-md:max-w-none"
        >
            <h3 class="font-semibold">
                Hey, <span class="highlighted">{user?.name}</span>
            </h3>

            <div class="mt-3" />
            <hr class="mt-1 mb-4" />

            <form
                class="w-full min-w-[500px] flex-center gap-3 flex-col"
                use:form
                on:submit|preventDefault={handleSubmit}
            >
                <!-- Username -->
                <label class="label w-full">
                    <span>Username</span>
                    <input
                        class="input max-md:text-sm"
                        type="text"
                        placeholder="user843744"
                        name="username"
                        class:input-error={!$form.username?.valid &&
                            $form.username?.touched}
                        on:input={checkUsername}
                    />
                </label>

                <div class="mt-6" />
                <!-- actions -->
                <div class="flex justify-end w-full">
                    <button
                        disabled={!$form.valid}
                        class="btn max-md:btn-sm variant-ghost-primary"
                        >Lets Go!!</button
                    >
                </div>
            </form>
        </div>
    </div>
{/if}
