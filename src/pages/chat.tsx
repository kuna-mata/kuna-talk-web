import { useState, useCallback } from 'react';

import { createMessage, getAllMessages } from '../api/messages';
import { CreateMessageDto, GetAllMessagesDto } from '../dto/message.dto';
import { Message } from '../types/api/message';
import { delay, randomId } from '../utils';

export function Chat() {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessage = useCallback(async (dto: GetAllMessagesDto) => {
    const messages = await getAllMessages(dto);

    if (messages) {
      setMessages((prev) => [...prev, ...messages]);
    }
  }, []);

  const sendMessage = useCallback(async () => {
    if (newMessage) {
      console.log(newMessage);

      const dto: CreateMessageDto = {
        senderId: `${Math.random().toString(36).substring(2, 9)}-${Date.now()}`,
        receiverId: `${Math.random()
          .toString(36)
          .substring(2, 9)}-${Date.now()}`,
        messageId: randomId,
        message: newMessage,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { data, status } = await createMessage(dto);
      setNewMessage('');

      if (status === 201) {
        const fetchDto: GetAllMessagesDto = {
          senderId: data.senderId,
          receiverId: data.receiverId,
          createdAt: data.createdAt,
        };

        await delay(1000);
        await fetchMessage(fetchDto);
      }
    }
  }, [fetchMessage, newMessage]);

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

        {messages.length > 0
          ? messages.map((value: Message, index: number) => {
              return (
                <div key={index}>
                  <div>
                    <strong>Sender: {value.senderId}</strong>
                    <br />
                    <strong>Receiver: {value.receiverId}</strong>
                    <p>Message: {value.message}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
