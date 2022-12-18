import { Command } from "./_command";
import { Ping } from "./ping";
import { CreateGame } from "./createGame";

export const Commands = new Map<string, Command>()
Commands.set(Ping.id, Ping)
Commands.set(CreateGame.id, CreateGame)