import { PermissionFlagsBits } from "discord.js"

export abstract class GlobalConstants {
    static readonly THUMBNAIL = "https://cdn.discordapp.com/avatars/1053571349425172480/f8b2eec90e6f9b630dfd1e3df6326a34.png"
    static readonly ERROR = "An error occured. Blame Chava!"
    static readonly ERROR_TEMP = "Hi! If you're seeing this, I am running in damage control mode. The error threshold was crossed in the past hour. It's likely that something is wrong with whatever you are trying to do. Everything else should be working fine. Just don't touch it again. Rivka will try and fix it after Passover. If you'd like to debug this on your own, `@Formulate` to learn more."
    static readonly ID_SEPARATOR = '_'
    static readonly Permissions = PermissionFlagsBits.ModerateMembers
}