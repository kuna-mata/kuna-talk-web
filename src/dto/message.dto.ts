export interface CreateMessageDto {
  senderId: string;
  receiverId: string;
  messageId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
