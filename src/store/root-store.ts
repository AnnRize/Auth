import { DashboardData } from "./DashboardData.store";
import { Theme } from "./Theme.store";
import { User } from "./User.store";

// Глобальные хранилища
export const RootStore = {
   themeStore: Theme(),
   userStore: User(),
   dashboardDataStore: DashboardData(),
};
