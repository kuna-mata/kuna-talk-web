export interface CreateMessageDto {
  senderId: string;
  receiverId: string;
  messageId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadMessageDto {
  senderId: string;
  receiverId: string;
  messageId: string;
}
