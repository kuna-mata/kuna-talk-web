export interface Message {
  senderId: string;
  receiverId: string;
  messageId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
