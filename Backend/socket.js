const socketIo = require('socket.io');
const userModel = require('./models/user.model' );
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: 'http://localhost:5173', // Ensure this matches your frontend's URL
            methods: ['GET', 'POST'],
        },
    });

    console.log('Socket.IO server initialized');

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (error) {
                console.error('Error in join event:', error.message);
                socket.emit('error', { message: 'Failed to join' });
            }
        });

        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data;

                if (!location || !location.ltd || !location.lng) {
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng,
                    },
                });
            } catch (error) {
                console.error('Error in update-location-captain event:', error.message);
                socket.emit('error', { message: 'Failed to update location' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
};

module.exports = { initializeSocket, sendMessageToSocketId };