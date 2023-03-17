import { serverHttp } from "./http.js";
import './websocket.js'


serverHttp.listen(3000, ()=>{
  console.log("Servidor rodando na porta 3000")
  
})