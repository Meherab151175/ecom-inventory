"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const app_module_1 = require("src/app.module");
const expressApp = (0, express_1.default)();
const adapter = new platform_express_1.ExpressAdapter(expressApp);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.enableCors();
    await app.init();
    return expressApp;
}
let server;
async function handler(req, res) {
    if (!server)
        server = await bootstrap();
    return server(req, res);
}
//# sourceMappingURL=serverless.js.map