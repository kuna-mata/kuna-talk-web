import { useState, useCallback } from 'react';

import { createMessage } from '../api/messages';
import { CreateMessageDto } from '../dto/message.dto';

export function Chat() {
  const [newMessage, setNewMessage] = useState<string>('');

  const sendMessage = useCallback(async () => {
    if (newMessage) {
      const senderId = '1234';
      const receiverId = 'qwer';
      const messageId = senderId + receiverId;

      const dto: CreateMessageDto = {
        senderId: senderId,
        receiverId: receiverId,
        messageId: messageId,
        message: newMessage,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createMessage(dto);
    }
  }, []);

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
      <div>{newMessage}</div>
    </div>
  );
}
