import { create } from "zustand";
import type { AdminAccount } from "../Types/AdminAccounts";
import { createJSONStorage, persist } from "zustand/middleware";


interface AdminState {
  adminAccountContext: AdminAccount | null;
  setAdminContext: (account: AdminAccount) => void;
  clearAdminContext: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      adminAccountContext: null,
      setAdminContext: (adminAccount: AdminAccount) => set({adminAccountContext: adminAccount}),
      clearAdminContext: () => set({adminAccountContext: null})
    }),
    {
      name: "AdminStoreStorage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)