import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>WebSocket - Client</h2>
    <input  id="jwt-token" placeholder="Json Web Token"/>
    <button id="btn-connect">Conectar</button>

    <span id="server-status"></span>

    <ul id="clients-ul">
    </ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>
      <ul id="messages-ul">
      </ul>
    </h3>
  </div>
`

const inputJwt = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (inputJwt.value.trim().length <= 0) {
    return alert('Ingresar un JWT válido');
  }

  connectToServer(inputJwt.value.trim());
});