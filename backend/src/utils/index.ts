import { type WebSocket } from "ws";
import { EXCLUDED_FROM_BROADCAST } from "../constants";
import { MessageToSend } from "../types";

export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (input: T) =>
    fns.reduce((acc, fn) => fn(acc), input);

export const isBroadcastMessageType = (messageType: string): boolean => {
  return !EXCLUDED_FROM_BROADCAST.includes(messageType);
};

export const sendMessage = (clients: WebSocket[], client: WebSocket) => (message: MessageToSend): void => {
  const broadcast = isBroadcastMessageType(message.type);
  const JSONData = JSON.stringify(message.data)
  const JSONMessage = JSON.stringify({ type: message.type, data: JSONData, id: message.id });
  if (broadcast) {
    clients.forEach((client: WebSocket) => {
      client.send(JSONMessage);
    });
  } else {
    client.send(JSONMessage);
  }
};

export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error);
}