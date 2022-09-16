import { useContext } from "react";
import { SyncContext, SyncContextType } from "../components/SyncProvider/SyncProvider";

export const useSyncContext = (): SyncContextType => {
	const context = useContext(SyncContext);
	if (!context) {
		throw new Error("[RACE SDK] useSyncContext must be used within a SyncProvider");
	}
	return context;
}