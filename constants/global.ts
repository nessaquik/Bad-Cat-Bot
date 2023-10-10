import { PermissionFlagsBits } from "discord.js"

export abstract class GlobalConstants {
    static readonly THUMBNAIL = "https://cdn.discordapp.com/avatars/1053571349425172480/f8b2eec90e6f9b630dfd1e3df6326a34.png"
    static readonly ERROR = "An error occured. Ask Rivka (unless it's Shabbos)!"
    static readonly ID_SEPARATOR = '_'
    static readonly Permissions = PermissionFlagsBits.ModerateMembers
    static readonly NOT_THE_DM = "AYO! You are SO NOT the DM!"
    static readonly WELCOME = "If you're looking for Rivka, you're shit out of luck kid!\n You get a Toby instead"
    static readonly WELCOME_IMAGE = "https://i.imgur.com/7Zt9B4j.png"
    static readonly RIVKA_ID = "943458535155572826"
}