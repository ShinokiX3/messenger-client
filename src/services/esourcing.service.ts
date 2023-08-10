class EventSourcing {
	SOURCE = `https://messenger-server-production-06a1.up.railway.app`;

	chatConnection(handler: React.Dispatch<React.SetStateAction<string>>) {
		const eventSource = new EventSource(`${this.SOURCE}/chat/connection`);

		eventSource.onmessage = (event: any) => {
			const message = JSON.parse(event.data);
			handler(message);
		};
	}
}

export default new EventSourcing();
