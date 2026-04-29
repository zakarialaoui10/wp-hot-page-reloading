import { useIPC } from "ziko/src/hooks/use-ipc.js";
import {
	CHANNEL_NAME,
	EVENT_NAME
} from './shared.js'
const matser = useIPC(CHANNEL_NAME);

(()=>{
	let wasSaving = false;
	wp.data.subscribe(() => {
		const select = wp.data.select('core/editor');
		if (!select) return;
		const isSaving = select.isSavingPost();
		const isAutosaving = select.isAutosavingPost();
		if (isSaving && !isAutosaving) wasSaving = true;
		if (wasSaving && !isSaving) {
			matser.emit(EVENT_NAME)
			console.log('[WP Live Reload] Broadcast sent');
			wasSaving = false;
		}
	});
})();