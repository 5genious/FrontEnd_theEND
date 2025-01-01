import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import incidentsSlice from "./features/incident/incidentsSlice";
import incidentSlice from "./features/incident/incidentSlice";
import demandesSlice from "./features/demande/demandesSlice";
import demandeSlice from "./features/demande/demandeSlice";
import technicianSlice from "./features/Technician/technicianSlice";
import incidentsStatisticsSlice from "./features/Statistics/incidentStatisticsSlice";
import notificationSlice from "./features/Notifications/notificationSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    incidents: incidentsSlice,
    incident: incidentSlice,
    demandes: demandesSlice,
    demande: demandeSlice,
    technician: technicianSlice,
    incidentStatistics: incidentsStatisticsSlice,
    notification: notificationSlice,
  },
});
