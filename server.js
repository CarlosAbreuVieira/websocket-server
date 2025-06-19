const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  console.log('Cliente conectado');

  ws.on('message', message => {
    console.log(`Mensagem recebida: ${message}`);

    // Reenvia a mensagem para todos os outros clientes
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

console.log(`Servidor WebSocket escutando na porta ${PORT}`);
