import { AxiosResponse } from "axios";
import $api from "../http";
import { GetMessagesBetweenDto, IMessage, IMessageFromResponse } from "../interfaces/IMessage";

export default class MessagesService {
  static fetchMessagesBetween(
    request: GetMessagesBetweenDto
  ): Promise<AxiosResponse<IMessageFromResponse[]>> {
    const { senderId, receiverId } = request;
    return $api.post<IMessageFromResponse[]>("/messages/get", { senderId, receiverId });
  }

  static sendMessageFromAdmin(
    request: IMessage
  ): Promise<AxiosResponse<IMessage[]>> {
    const { receiverId, senderId, content } = request
    return $api.post<IMessage[]>("/messages/send", { senderId, receiverId, content });
  }
}
