import { Manager, Socket } from "socket.io-client"

let socket: Socket;
export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        }
    });

    // Borrar todos los sockets anteriores antes de tener uno nuevo
    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners(socket);
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;

    const messageForm = document.querySelector('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'connected';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHTML = '';
        clients.forEach(clientId => {
            clientsHTML += `
                <li>${clientId}</li>
            `;
        });

        clientsUl.innerHTML = clientsHTML;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (messageInput.value.trim().length <= 0) {
            return;
        }

        const data = {
            id: '',
            message: messageInput.value
        }

        socket.emit('message-from-client', data);
    });

    socket.on('messages-from-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    });
}