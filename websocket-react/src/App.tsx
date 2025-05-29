import { useState, useEffect } from 'react';

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socketInstance = new WebSocket('ws://localhost:8080');

    socketInstance.onopen = () => {
      console.log('WebSocket connected');
      setSocket(socketInstance);
    };

    socketInstance.onmessage = async (message) => {
      let finalMessage = '';

      // Convert Blob to string if needed
      if (message.data instanceof Blob) {
        finalMessage = await message.data.text();
      } else {
        finalMessage = message.data;
      }

      setMessages((prev) => [...prev, finalMessage]);
    };

    socketInstance.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketInstance.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socketInstance.close();
    };
  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  const handleSend = () => {
    if (input.trim() !== '') {
      socket.send(input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Chat App</h2>

      <div>
        <strong>Messages:</strong>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
        style={{ marginRight: '10px', padding: '5px' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
