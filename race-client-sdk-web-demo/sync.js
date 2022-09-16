/* eslint-disable @typescript-eslint/no-unused-vars */
/* global RaceSDK */
/* global console */

let sync;

function SyncInit() {
    let syncReady;
    let status = "closed";

    sync = new RaceSDK.Sync({ accountSid: ACCOUNT_SID, identity: IDENTITY, kioskId: KIOSK_ID });
    
    sync.on("sync#ready", () => {
        console.info("[SyncProvider] Sync Ready");
        sync.init();
    });

    sync.on("sync#connected", async () => {
        console.info("[SyncProvider] Sync Connected");
        const statusDocument = await sync.registerDocument({ name: `K-${KIOSK_ID}` });
        console.info("[SyncProvider] Sync Document Registered", statusDocument);

        if(statusDocument.data.status) {
            syncReady = true;
            status = statusDocument.data.status;
            statusDocument.on("updated", handleUpdate);
            setInterval(interval, 1000);
        }
    });


    const interval = () => {
        if(syncReady && videoReady && status) {
            document.getElementById("status-label").innerHTML = (status === "ready" ? "The Contact Centre is Currently Open" : "The Contact Centre is Currently Closed");
        }
        
        if(syncReady && videoReady && status === "ready") {
            document.getElementById("video-call-btn").disabled = false;
            document.getElementById("voice-call-btn").disabled = false;
        }
    }

    const handleUpdate = (update) => {
        console.info("[SyncProvider] Kiosk Config Changes", update);
        if (typeof update.data.status !== "undefined") {
            status = update.data.status;
        }
    }
}