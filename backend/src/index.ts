import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import { getRequestHandler } from "./handleRequests";
import { getErrorMessage, sendMessage } from "./utils";
import { ClientResponse, SendMessageCallback } from "./types";

const clients: WebSocket[] = [];

export const httpServer = http.createServer(function (req, res) {
  const dirname = path.dirname(path.join('../..'));
  const filePath = path.join(dirname, req.url === "/" ? "/front/index.html" : "/front" + req.url);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port: ${process.env.SERVER_PORT}`); 
});

export const wss = new WebSocketServer({ port: Number(process.env.WEBSOCKET_PORT) });

wss.on("listening", () => {
  console.log(`Websocket listening on port: ${process.env.WEBSOCKET_PORT}`);
});

wss.on("connection", ws => {
  console.log("Websocket connection created.")
  clients.push(ws);

  ws.on("message", (message) => {
    try {
      const response: ClientResponse = JSON.parse(message.toString());
      const { type, data } = response;
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      const onSend: SendMessageCallback = sendMessage(clients, ws);
      getRequestHandler(type)?.(parsedData, onSend);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage)
    }
  });

  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
      console.log("Websocket connection closed.");
    }
  })
});

wss.on("close", () => {
  console.log("All websocket connections closed.");
});

httpServer.on("close", function () {
  console.log("Server connection closed.");
});

process.on("SIGINT", function () {
  wss.close();
  httpServer.close();
});
