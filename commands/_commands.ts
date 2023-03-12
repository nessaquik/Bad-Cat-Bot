import { Command } from "./_command";
import { Ping } from "./ping";
import { CreateGame } from "./createGame";
import { Lisette } from "./lisette";
import { IsItBlacklisted } from './isItBlacklisted';
import { IsBlacklisted } from './isBlacklisted';

export const Commands = new Map<string, Command>()
Commands.set(Ping.id, Ping)
Commands.set(CreateGame.id, CreateGame)
Commands.set(Lisette.id, Lisette)
Commands.set(IsItBlacklisted.id, IsItBlacklisted)
Commands.set(IsBlacklisted.id, IsBlacklisted)