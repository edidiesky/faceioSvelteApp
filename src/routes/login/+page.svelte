<script lang="ts">
  let tab: boolean = true;
  const OnTab = (): void => {
    tab = true;
  };

  const CloseTab = (): void => {
    tab = false;
  };
</script>

<main class="bg-[#F4F4F9] min-h-[100vh]">
  <div
    class="w-full max-w-[1200px] px-8 mx-auto min-h-[600px] flex gap-12 flex-col md:items-center justify-center"
  >
    <div
      class="w-full p-6 bg-white md:w-[560px] shadow rounded-xl flex flex-col gap-8"
    >
      <h2 class="text-3xl md:text-4xl md:text-center font-bold">Milzbank</h2>
      <div
        class="w-full p-1 rounded-md flex items-center bg-[#F4F4F9] justify-between gap-4"
      >
        <div
          on:click={OnTab}
          class={`flex-1 text-sm font-semibold ${tab ? "bg-white shadow" : ""} text-center  p-2 rounded-md cursor-pointer`}
        >
          Login
        </div>
        <div
          on:click={CloseTab}
          class={`flex-1 text-sm font-semibold ${!tab ? "bg-white shadow" : ""} text-center  p-2 rounded-md cursor-pointer`}
        >
          Sign Up
        </div>
      </div>
      {#if tab}
        <div class="w-full flex flex-col gap-4">
          <label for="" class="text-sm font-normal flex flex-col gap-2">
            Email
            <input
              type="text"
              placeholder="Enter your email"
              class="w-full h-12 px-4 border text-sm"
            />
          </label>
          <label for="" class="text-sm font-normal flex flex-col gap-2">
            Password
            <input
              type="text"
              placeholder="Enter your Password"
              class="w-full h-12 px-4 border text-sm"
            />
          </label>
        </div>
      {:else}
        <div class="w-full flex flex-col gap-4">
          <label for="" class="text-sm font-normal flex flex-col gap-2">
            Email
            <input
              type="text"
              placeholder="Enter your email"
              class="w-full h-12 px-4 border text-sm"
            />
          </label>
          <label for="" class="text-sm font-normal flex flex-col gap-2">
            Password
            <input
              type="text"
              placeholder="Enter your Password"
              class="w-full h-12 px-4 border text-sm"
            />
          </label>
          <label for="" class="text-sm font-normal flex flex-col gap-2">
            Confirm Password
            <input
              type="text"
              placeholder="Confirm your  Password"
              class="w-full h-12 px-4 border text-sm"
            />
          </label>
        </div>
      {/if}
      <div class="flex w-full md:items-center md:justify-center">
        <button
          class="px-8 py-3 w-full hover:opacity-40 font-semibold text-sm rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
        >
          {#if tab}
            Login
          {:else}
            Sign Up
          {/if}
        </button>
      </div>
    </div>
  </div>
</main>
