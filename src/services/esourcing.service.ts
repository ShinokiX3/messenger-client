import { SOURCE } from "./sources.const";

class EventSourcing {
	chatConnection(handler: React.Dispatch<React.SetStateAction<string>>) {
		const eventSource = new EventSource(`${SOURCE}/chat/connection`);

		eventSource.onmessage = (event: any) => {
			const message = JSON.parse(event.data);
			handler(message);
		};
	}
}

export default new EventSourcing();
