"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const discord_js_1 = __importDefault(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [
        v10_1.GatewayIntentBits.GuildMessages,
        v10_1.GatewayIntentBits.Guilds,
        v10_1.GatewayIntentBits.MessageContent
    ]
});
client.on('ready', () => {
    console.log('The bot is ready');
});
client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: "pong",
        });
    }
});
client.login(process.env.TOKEN);
