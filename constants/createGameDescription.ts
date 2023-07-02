export class CreateGameTemplateHeader {
    static readonly FORMAT = `*Game Format*`
    static readonly HOMEBREW = `*Homebrew*`
    static readonly ABILITY_GEN = `*Ability Score Generation*`
    static readonly TIME = `*Time*`
    static readonly PLAYERS = `*Players*`
    static readonly LEVEL = `*Level*`
    static readonly VTT = `*VTT*`
    static readonly VC = `*Voice Chat*`
    static readonly APP_CLOSE = `*Applications Close*`
}

export const GAME_DETAILS_SEPARATOR = ": "
export const CreateGameTemplate = [
    CreateGameTemplateHeader.FORMAT,
    CreateGameTemplateHeader.HOMEBREW,
    CreateGameTemplateHeader.ABILITY_GEN,
    CreateGameTemplateHeader.TIME,
    CreateGameTemplateHeader.PLAYERS,
    CreateGameTemplateHeader.LEVEL,
    CreateGameTemplateHeader.VTT,
    CreateGameTemplateHeader.VC,
    CreateGameTemplateHeader.APP_CLOSE]

export const CREATE_GAME_APPLICATION = `Preferred Player Name: 
Player preferences or boundaries: 
Character Concept: 
Any other information you would like to add: `

export class GameInfoHeader {
    static readonly FORMAT = `Game Format`
}