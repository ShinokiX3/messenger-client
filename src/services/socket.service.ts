import { io } from 'socket.io-client';
import { SOURCE } from './sources.const';

class Socket {
	connect() { return io(SOURCE) }
}

export default new Socket();
