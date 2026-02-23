const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const si = require('systeminformation');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const LOG_FILE = path.join(__dirname, 'commands.log');

app.use(express.static(__dirname));

// Function to fetch and emit stats
async function emitStats() {
    try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const fsSize = await si.fsSize();

        const stats = {
            cpu: cpu.currentLoad.toFixed(1),
            ram: ((mem.active / mem.total) * 100).toFixed(1),
            disk: fsSize[0] ? fsSize[0].use.toFixed(1) : '0'
        };

        io.emit('stats', stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

// Emit stats every 2 seconds
setInterval(emitStats, 2000);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('command', (command) => {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${command}\n`;

        fs.appendFile(LOG_FILE, logEntry, (err) => {
            if (err) console.error('Error writing to log file:', err);
        });

        io.emit('log', `> ${command}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
