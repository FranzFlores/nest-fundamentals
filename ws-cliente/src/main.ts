import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>
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
connectToServer();