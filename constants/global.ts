import { PermissionFlagsBits } from "discord.js"

export abstract class GlobalConstants {
    static readonly THUMBNAIL = "https://cdn.discordapp.com/avatars/1053571349425172480/f8b2eec90e6f9b630dfd1e3df6326a34.png"
    static readonly ERROR = "An error occured. Ask Rivka (unless it's Shabbos)!"
    static readonly ID_SEPARATOR = '_'
    static readonly Permissions = PermissionFlagsBits.ModerateMembers
    static readonly NOT_THE_DM = "AYO! You are SO NOT the DM!"
    static readonly WELCOME = "Due to the current situation in Israel, we are using all our computing power to help scan media for missing civilians. Formulate will not be functional for the forseeable future. Consider donating to Magen David Adom or Zaka if you can - https://www.mdais.org/en/donation or https://give.zakaworld.org/ and reach out to cohenkosem if you are in Israel and need assistance (transportation, housing, food, locating a friend/family member or medical help) or a burial certificate."
    static readonly RIVKA_ID = "943458535155572826"
}