<script lang="ts">
  import { ArrowLeftIcon, SendIcon } from "lucide-svelte";
  import { spring } from "svelte/motion";
  import { fly } from "svelte/transition";

  // Modal state (passed from the parent)
  export let modal;
  export let OffTransferModal;

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
      <h2 class="text-3xl md:text-4xl flex items-center gap-4 font-bold">
        <button
          on:click={OffTransferModal}
          class="w-12 h-12 rounded-lg hover:bg-[#fafafa] flex items-center justify-center"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        Transfer Money
      </h2>
      <span class="block text-base font-normal pt-3">
        Send money to another Milzbank user
      </span>
    </div>
    <div class="w-full flex flex-col gap-4">
      <label for="" class="text-sm font-normal flex flex-col gap-2">
        Recipient
        <input
          type="text"
          placeholder="Enter Recipient's email or username"
          class="w-full h-12 px-4 border text-sm"
        />
      </label>
      <label for="" class="text-sm font-normal flex flex-col gap-2">
        Amount
        <input
          type="text"
          placeholder="$0.00"
          class="w-full h-12 px-4 border text-sm"
        />
      </label>
    </div>
    <div class="flex w-full md:items-center md:justify-center">
      <button
        class="px-8 py-3 w-full hover:opacity-40 font-semibold text-sm rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
      >
        <SendIcon width={2} height={2} />
        Send Money
      </button>
    </div>
  </div>
</main>
