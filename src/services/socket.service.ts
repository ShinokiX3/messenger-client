import { io } from 'socket.io-client';

class Socket {
	SOURCE = `https://messenger-server-production-06a1.up.railway.app`;

	connect() {
		return io(this.SOURCE);
	}
}

export default new Socket();
