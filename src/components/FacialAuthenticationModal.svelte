<script lang="ts">
  import { ArrowLeftIcon, EyeIcon, LockIcon } from "lucide-svelte";
  import { spring } from "svelte/motion";
  import { fly } from "svelte/transition";

  // Modal state (passed from the parent)
  export let modal;
  export let offAuthModal;
  export let authenticateNewUser;

  // Motion
  let y = spring(0, { stiffness: 0.1, damping: 0.15 });
</script>

<main
  style="opacity: {modal ? 1 : 0}"
  class="bg-[#1818183a] fixed top-0 left-0 z-40 min-h-[100vh] w-full flex items-center justify-center"
>
  <div
    class="w-[95%] p-6 bg-white md:w-[560px] shadow rounded-xl flex flex-col gap-8"
    transition:fly={{ y: 200, duration: 600 }}
    style="opacity: {modal ? 1 : 0}"
  >
    <div class="flex w-full flex-col gap-2">
      <h2 class="text-xl md:text-2xl flex items-center gap-4 font-bold">
        <button
          on:click={offAuthModal}
          class="w-12 h-12 rounded-lg hover:bg-[#fafafa] flex items-center justify-center"
        >
          <ArrowLeftIcon class="h-5 w-5" />
        </button>
        Facial Authentication Required
      </h2>
      <span class="block text-base font-normal">
        Please verify your identity to proceed with the transaction.
      </span>
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-4">
      <div class="relative h-24 w-24">
        <div class="absolute inset-0 rounded-full bg-[#1A2E5A]" />
        <div class="absolute inset-2 rounded-full bg-white" />
        <div class="absolute inset-4 rounded-full bg-[#1A2E5A]" />
        <EyeIcon class="absolute inset-6 text-[#00BFA6]" />
      </div>
      <span class="block text-base font-normal pt-3">
        Click the button below to start the facial recognition process.
      </span>
    </div>
    <div class="flex w-full md:items-center md:justify-center">
      <button
        on:click={authenticateNewUser}
        class="px-8 py-3 w-full hover:opacity-40 font-semibold text-sm md:text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
      >
        Start Facial Scan
      </button>
    </div>
  </div>
</main>
