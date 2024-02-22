import { httpServer } from "./src/http_server/index";

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`); 
});
