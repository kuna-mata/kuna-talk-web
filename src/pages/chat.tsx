import { useState, useCallback } from 'react';

import { createMessage, readMessage } from '../api/messages';
import { CreateMessageDto, ReadMessageDto } from '../dto/message.dto';

export function Chat() {
  const [newMessage, setNewMessage] = useState<string>('');

  const sendMessage = useCallback(async () => {
    if (newMessage) {
      const senderId = '1234';
      const receiverId = 'qwer';
      const messageId = senderId + receiverId;

      console.log(newMessage);
      const dto: CreateMessageDto = {
        senderId: senderId,
        receiverId: receiverId,
        messageId: messageId,
        message: newMessage,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { data, status } = await createMessage(dto);

      if (status === 201) {
        const fetchDto: ReadMessageDto = {
          senderId: data.senderId,
          receiverId: data.receiverId,
          messageId: data.messageId,
        };

        setTimeout(() => {
          fetchMessage(fetchDto);
        }, 2000);
      }
    }
  }, []);

  const fetchMessage = useCallback(async (dto: ReadMessageDto) => {
    await readMessage(dto);
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
    </div>
  );
}
