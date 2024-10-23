<script lang="ts">
  import { onMount } from "svelte";
  import faceIO from "@faceio/fiojs";
  import { PUBLIC_FACEIO_PUBLIC_ID } from "$env/static/public";
  import {
    ArrowUpIcon,
    EyeIcon,
    ArrowDownIcon,
    SendIcon,
    UserIcon,
  } from "lucide-svelte";

  import Header from "../../components/Header.svelte";
  import TransferModal from "../../components/TransferModal.svelte";
  import FacialAuthenticationModal from "../../components/FacialAuthenticationModal.svelte";

  let showAuthModal: boolean = false;
  let showTransferModal: boolean = false;
  const OnAuthenticationModal = (): void => {
    showAuthModal = true;
  };
  export let data;
  const OnTransferModal = (): void => {
    showTransferModal = true;
  };
  const OffTransferModal = (): void => {
    showTransferModal = false;
  };
  const offAuthModal = (): void => {
    showAuthModal = false;
  };
  let amount: number = 1000;
  // let transactions: {
  //   type: string;
  //   id: number;
  //   amount: number;
  //   from?: string;
  //   to?: string;
  //   date: string;
  // }[] = [
  // {
  //   id: 1,
  //   type: "received",
  //   amount: 500,
  //   from: "John Doe",
  //   date: "2023-05-15",
  // },
  //   // { id: 2, type: "sent", amount: 200, to: "Jane Smith", date: "2023-05-14" },
  //   // {
  //   //   id: 3,
  //   //   type: "received",
  //   //   amount: 1000,
  //   //   from: "Company Inc.",
  //   //   date: "2023-05-13",
  //   // },
  //   // { id: 4, type: "sent", amount: 50, to: "Coffee Shop", date: "2023-05-12" },
  // ];

  let transactions: {
    type: string;
    id: number;
    amount: number;
    from?: string;
    to?: string;
    date: string;
  }[] = [];

  // Load transactions from localStorage on mount
  onMount(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      transactions = JSON.parse(storedTransactions);
    }
  });

  // FACEIO LOGICS

  let faceio: {
    enroll: (arg0: {
      locale: string;
      token: any;
      payload: { email: string | null | undefined };
    }) => any;
  };

  // Run only in the browser
  onMount(() => {
    console.log(PUBLIC_FACEIO_PUBLIC_ID);

    // Initialize faceIO inside onMount to avoid SSR issues
    faceio = new faceIO(PUBLIC_FACEIO_PUBLIC_ID);

    // Any other faceIO-related logic can be added here
  });
  const authenticateNewUser = async () => {
    try {
      const userInfo = await faceio.enroll({
        locale: "auto",
        token: "fioaf212",

        // locale: "auto",
        // token: PUBLIC_FACEIO_PUBLIC_ID,
        payload: {
          email: data?.session?.user?.email,
        },
      });

      console.log(userInfo);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };
</script>

{#if data.session}
  <!-- Render child routes when session is available -->
  <main class="bg-[#F4F4F9] pb-20 min-h-[100vh]">
    {#if showTransferModal}
      <TransferModal
        {transactions}
        modal={showTransferModal}
        {OffTransferModal}
      />
    {/if}
    {#if showAuthModal}
      <FacialAuthenticationModal
        {authenticateNewUser}
        modal={showAuthModal}
        {offAuthModal}
      />
    {/if}
    <!-- FacialAuthenticationModal -->
    <Header />
    <div
      class="w-full max-w-[1200px] px-4 md:px-8 mx-auto mt-4 min-h-[600px] flex gap-12 flex-col md:items-center justify-center"
    >
      <div
        class="w-full flex flex-col gap-8 items-start p-8 rounded-lg bg-[#1A2E5A] text-white"
      >
        <h3 class="text-xl font-semibold md:text-2xl">Account Balance</h3>
        <!-- <h2 class="text-2xl font-semibold md:text-4xl">${amount}</h2> -->
        <button
          on:click={OnAuthenticationModal}
          class="px-8 py-3 hover:opacity-40 font-semibold text-sm md:text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
          ><EyeIcon size={20} />View Balance</button
        >
      </div>

      <!-- <div class="flex w-full items-center justify-center gap-8">
        <button
          on:click={OnTransferModal}
          class="px-8 py-3 hover:opacity-40 font-semibold text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
          ><SendIcon height={2} width={2} /> Send Money</button
        >
        <button
          on:click={OnAuthenticationModal}
          class="px-8 py-3 hover:opacity-40 font-semibold text-base rounded-lg bg-[#fff] border text-dark flex items-center justify-center gap-4"
          ><UserIcon height={2} width={2} /> Request Money</button
        >
      </div> -->
      <div
        class="w-full flex flex-col gap-6 p-8 rounded-lg items-start bg-[#fff] shadow text-dark"
      >
        <h2 class="text-xl font-semibold md:text-2xl">
          Swift Transfer with Milzbank
          <span class="text-base block pt-3 max-w-[450px] font-normal">
            Send money across borders instantly with our cutting-edge currency
            exchange platform.
          </span>
        </h2>

        <button
          on:click={OnTransferModal}
          class="px-8 py-3 hover:opacity-40 font-semibold text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
          ><SendIcon font-size={"12px"} size={20} /> Start Swift Transfer</button
        >
      </div>
      <div
        class="w-full flex flex-col gap-8 p-8 rounded-lg bg-[#fff] shadow text-dark"
      >
        <h2 class="text-xl font-semibold md:text-2xl">
          {#if transactions?.length !== 0}
            Recent Transactions
          {:else}
            No Transactions
          {/if}
        </h2>
        {#if transactions?.length !== 0}
          <ul class="space-y-4">
            {#each transactions as transaction (transaction.id)}
              <li class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  {#if transaction.type === "received"}
                    <ArrowDownIcon class="h-6 w-6 text-green-500" />
                  {:else}
                    <ArrowUpIcon class="h-6 w-6 text-red-500" />
                  {/if}
                  <div>
                    <p class="font-medium text-lg md:text-xl">
                      {transaction.type === "received"
                        ? transaction.from
                        : transaction.to}
                    </p>
                    <p class="text-sm md:text-base text-gray-500">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <p
                  class={`font-medium md:text-xl text-lg ${transaction.type === "received" ? "text-green-500" : "text-red-500"}`}
                >
                  {transaction.type === "received"
                    ? "+"
                    : "-"}${transaction.amount.toFixed(2)}
                </p>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </main>
{:else}
  <!-- Optionally show a message or something else before redirection -->
  <p>Redirecting...</p>
{/if}
