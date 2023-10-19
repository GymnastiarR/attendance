import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io( import.meta.env.VITE_SOCKET );
export default socket;