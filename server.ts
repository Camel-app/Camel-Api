import http from 'http';
import app from './v1/src/app';

const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 3001;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
