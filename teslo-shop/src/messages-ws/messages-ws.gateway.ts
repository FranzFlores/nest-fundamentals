import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new-message.dto';

@WebSocketGateway({
  cors: true
})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesWsService: MessagesWsService) { }

  handleConnection(client: Socket) {
    console.log('Cliente conectado', client.id);
    this.messagesWsService.registerClient(client);

    console.log({ total: this.messagesWsService.getConnectedClients().length });
    this.server.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado', client.id);
    this.messagesWsService.removeClient(client.id);

    console.log({ total: this.messagesWsService.getConnectedClients().length });
    this.server.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // Emitir al cliente que se conecto
    client.emit('message-from-server', {
      fullName: 'Example',
      message: payload.message || 'no message'
    });

    // Emitir a todos los cliente menos al inicial
    client.broadcast.emit('message-from-server', {
      fullName: 'Example',
      message: payload.message || 'no message'
    });
  }

}
