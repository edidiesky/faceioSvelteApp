<script>
  import Logo from "./Logo.svelte";
  import { LogOutIcon } from "lucide-svelte";
</script>

<div
  class="flex w-full h-[80px] bg-[#1A2E5A] text-white items-center space-x-2"
>
  <div class="max-w-[1200px] w-full mx-auto flex items-center justify-between">
    <Logo />
    <div class="flex justify-end items-center">
      <button class="hover:bg-[#fafafa] flex items-center justify-center rounded-lg hover:text-[#000] h-[40px] w-[50px]">
        <LogOutIcon class="h-5 w-5" />
        <span class="sr-only">Log out</span>
      </button>
    </div>
  </div>
</div>
