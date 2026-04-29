import { useIPC } from "ziko/src/hooks/use-ipc.js";
import {
	CHANNEL_NAME,
	EVENT_NAME
} from './shared.js'
const slave  = useIPC(CHANNEL_NAME);
slave.on(EVENT_NAME, () => {
        location.reload();  
})
