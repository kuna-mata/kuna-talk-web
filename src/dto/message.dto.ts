export interface CreateMessageDto {
  senderId: string;
  receiverId: string;
  messageId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllMessagesDto {
  senderId: string;
  receiverId: string;
  createdAt: Date;
}

export interface GetMessageDto {
  senderId: string;
  receiverId: string;
  messageId: string;
}
