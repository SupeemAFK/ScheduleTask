"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const connect_redis_1 = require("connect-redis");
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)();
redisClient.connect().catch(console.error);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: new connect_redis_1.default({ client: redisClient }),
        resave: false,
        saveUninitialized: false,
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map