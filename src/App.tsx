import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to the backend show that port frontend is connected to backend

function App() {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<{ message: string }[]>([]);

	// Listen for incoming messages
	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		// Cleanup on unmount
		return () => {
			socket.off("receive_message");
		};
	}, []);

	// Send a message to the server
	const sendMessage = () => {
		if (message.trim()) {
			socket.emit("send_message", { message });
			setMessage("");
		}
	};

	return (
		<div>
			<h1>Chat App</h1>
			<div>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type a message..."
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
			<div>
				<h2>Messages:</h2>
				<ul>
					{messages.map((msg, index) => (
						<li key={index}>{msg.message}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
