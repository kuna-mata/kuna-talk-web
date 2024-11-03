import { useState, useCallback } from 'react';

import { AxiosResponse } from 'axios';

import { createMessage, readMessage } from '../api/messages';
import { CreateMessageDto, ReadMessageDto } from '../dto/message.dto';
import { Message } from '../types/api/message';
import { delay, randomId } from '../utils';

export function Chat() {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<AxiosResponse<Message>[]>([]);

  const fetchMessage = useCallback(async (dto: ReadMessageDto) => {
    const message = await readMessage(dto);

    if (message) {
      setMessages((prev) => [...prev, message]);
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
        const fetchDto: ReadMessageDto = {
          senderId: data.senderId,
          receiverId: data.receiverId,
          messageId: data.messageId,
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
          ? messages.map((value: AxiosResponse<Message>, index: number) => {
              const data = value.data;

              return (
                <div key={index}>
                  <div>
                    <strong>Sender: {data.senderId}</strong>
                    <br />
                    <strong>Receiver: {data.receiverId}</strong>
                    <p>Message: {data.message}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
