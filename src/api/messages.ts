import { AxiosResponse } from 'axios';

import { axiosClient } from '../config/axios';
import {
  CreateMessageDto,
  GetAllMessagesDto,
  ReadMessageDto,
} from '../dto/message.dto';
import { Message } from '../types/api/message';

export async function createMessage(
  dto: CreateMessageDto,
): Promise<AxiosResponse<Message>> {
  try {
    const response = await axiosClient.post('/chat', dto);
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllMessages(
  dto: GetAllMessagesDto,
): Promise<Message[]> {
  try {
    const response = await axiosClient.get('/chat', {
      params: dto,
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function readMessage(
  dto: ReadMessageDto,
): Promise<AxiosResponse<Message>> {
  try {
    const response = await axiosClient.get('/chat', {
      params: dto,
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
