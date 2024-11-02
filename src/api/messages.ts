import { axiosClient } from '../config/axios';
import { CreateMessageDto } from '../dto/message.dto';

export async function createMessage(dto: CreateMessageDto) {
  try {
    const response = await axiosClient.post('/chat', dto);
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
