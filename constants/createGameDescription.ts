export class CREATE_GAME_TEMPLATE_VALUES {
    static readonly FORMAT = `**Game Format**`
    static readonly HOMEBREW = `**Homebrew**`
    static readonly ABILITY_GEN = `**Ability Score Generation**`
    static readonly TIME = `**Time**`
    static readonly PLAYERS = `**Players**`
    static readonly LEVEL = `**Level**`
    static readonly VTT = `**VTT**`
    static readonly VC = `**Voice Chat**`
    static readonly APP_CLOSE = `**Applications Close**`
}

export const GAME_DETAILS_SEPARATOR = ": "
export const CREATE_GAME_TEMPLATE = [
    CREATE_GAME_TEMPLATE_VALUES.FORMAT,
    CREATE_GAME_TEMPLATE_VALUES.HOMEBREW,
    CREATE_GAME_TEMPLATE_VALUES.ABILITY_GEN,
    CREATE_GAME_TEMPLATE_VALUES.TIME,
    CREATE_GAME_TEMPLATE_VALUES.PLAYERS,
    CREATE_GAME_TEMPLATE_VALUES.LEVEL,
    CREATE_GAME_TEMPLATE_VALUES.VTT,
    CREATE_GAME_TEMPLATE_VALUES.VC,
    CREATE_GAME_TEMPLATE_VALUES.APP_CLOSE]

export const CREATE_GAME_APPLICATION = `Preferred Player Name: 
Player preferences or boundaries: 
Character Concept: 
Any other information you would like to add: `