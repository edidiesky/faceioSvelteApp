<script lang="ts">
  import {
    ArrowUpIcon,
    EyeIcon,
    ArrowDownIcon,
    SendIcon,
    UserIcon,
  } from "lucide-svelte";
  import Header from "../../components/Header.svelte";

  let showAuthModal: boolean = true;
  const OnAuthenticationModal = (): void => {
    showAuthModal = true;
  };

  const toggleAuthModal = (): void => {
    showAuthModal = false;
  };
  const transactions = [
    {
      id: 1,
      type: "received",
      amount: 500,
      from: "John Doe",
      date: "2023-05-15",
    },
    { id: 2, type: "sent", amount: 200, to: "Jane Smith", date: "2023-05-14" },
    {
      id: 3,
      type: "received",
      amount: 1000,
      from: "Company Inc.",
      date: "2023-05-13",
    },
    { id: 4, type: "sent", amount: 50, to: "Coffee Shop", date: "2023-05-12" },
  ];
</script>

<main class="bg-[#F4F4F9] pb-20 min-h-[100vh]">
  <Header />
  <div
    class="w-full max-w-[1200px] px-4 md:px-8 mx-auto mt-4 min-h-[600px] flex gap-12 flex-col md:items-center justify-center"
  >
    <div
      class="w-full flex flex-col gap-8 p-8 rounded-lg bg-[#1A2E5A] text-white"
    >
      <h3 class="text-lg font-semibold md:text-2xl">Account Balance</h3>
      <h2 class="text-2xl font-semibold md:text-4xl">$2,500.00</h2>
    </div>

    <div class="flex w-full items-center justify-center gap-8">
      <button
        class="px-8 py-3 hover:opacity-40 font-semibold text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
        ><SendIcon height={2} width={2} /> Send Money</button
      >
      <button
        class="px-8 py-3 hover:opacity-40 font-semibold text-base rounded-lg bg-[#fff] border text-dark flex items-center justify-center gap-4"
        ><UserIcon height={2} width={2} /> Request Money</button
      >
    </div>
    <div
      class="w-full flex flex-col gap-8 p-8 rounded-lg bg-[#fff] shadow text-dark"
    >
      <h2 class="text-xl font-semibold md:text-2xl">Recent Transactions</h2>
      <div class="card-content">
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
      </div>
    </div>
  </div>
</main>
