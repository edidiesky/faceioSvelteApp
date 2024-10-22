<script>
  import "../app.css";
  import { page } from "$app/stores";
  // This will call the sign-in route that is provided by SvelteKitAuth
  async function loginWithGoogle() {
    window.location.href = "/auth/signin";
  }

  function HandleNavigateToDahboard() {
    window.location.href = "/dashboard";
  }
</script>

<main class="bg-[#F4F4F9] min-h-[100vh] flex items-center justify-center">
  <!-- Header -->
  <div class="h-[70px] fixed top-0 flex items-center w-full bg-[#fff] shadow">
    <div
      class="w-full max-w-[1200px] px-8 mx-auto flex items-center justify-between"
    >
      <h3 class="font-bold text-2xl">
        Miltz<span class="font-normal">bank</span>
      </h3>

      <ol class="hidden md:flex items-center justify-end gap-12">
        <li class="text-base">Features</li>
        <li class="text-base">Pricing</li>
        <li class="text-base">About</li>
      </ol>
    </div>
  </div>
  <div
    class="w-full max-w-[1200px] px-8 mx-auto min-h-[600px] flex gap-12 flex-col md:items-center justify-center"
  >
    <h2 class="text-5xl md:text-7xl md:text-center font-bold">
      Swift transfers with Milzbank
      <span
        class="font-normal text-base max-w-[600px] md:mx-auto block md:text-xl pt-6"
      >
        Send money across borders instantly with our cutting-edge currency
        exchange platform.
      </span>
    </h2>
    <div class="flex md:items-center md:justify-center">
      {#if $page.data.session}
         <button
          on:click={HandleNavigateToDahboard}
          class="px-8 py-3 hover:opacity-40 font-semibold text-lg rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
        >
          Go to Dashboard
        </button>
      {:else}
        <button
          on:click={loginWithGoogle}
          class="px-8 py-3 hover:opacity-40 font-semibold text-lg rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
        >
          Sign Up Now
        </button>
      {/if}
    </div>
  </div>
</main>
