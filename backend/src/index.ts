import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { WebSocketServer } from "ws";
import { processData } from "./handleRequests";

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
  ws.on("message", (message: Buffer) => {
    try {
      const response = JSON.parse(message.toString());
      console.log(response)
      const { type, data } = response;
      const parsedData = data ? JSON.parse(data) : data;
      console.log('parsedData', parsedData)
      processData(type)?.(ws, parsedData);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : error;
      throw new Error(errorMessage)
    }
  });
});

wss.on("close", () => {
  console.log("Websocket connection closed.");
});

httpServer.on("close", function () {
  console.log("Server connection closed.");
});

process.on("SIGINT", function () {
  wss.close();
  httpServer.close();
});
