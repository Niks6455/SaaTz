import type { Account } from "@/types/account";

export function useExportAccounts(accounts: Account[]) {
  function exportToJson() {
    const json = JSON.stringify(accounts, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `accounts-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return { exportToJson };
}
