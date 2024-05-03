import { AxiosResponse } from "axios";
import $api from "../http";
import { GetMessagesBetweenDto, IMessage, IMessageFromResponse } from "../interfaces/IMessage";

export default class MessagesService {
  static async fetchMessagesBetween(
    request: GetMessagesBetweenDto
  ): Promise<IMessageFromResponse[]> {
    const { senderId, receiverId } = request;
    const { data } = await $api.post<IMessageFromResponse[]>("/messages/get", { senderId, receiverId });
    return data
  }

  static sendMessageFromAdmin(
    request: IMessage
  ): Promise<AxiosResponse<IMessage[]>> {
    const { receiverId, senderId, content } = request
    return $api.post<IMessage[]>("/messages/send", { senderId, receiverId, content });
  }
}
