
export abstract class ApplyGameButtonConstants{
    static readonly ID = "apply-to-game"
    static readonly TITLE = "Apply to this game"    
    static readonly PAUSED_TITLE = "Applications Paused"
}

export abstract class EditGameButtonConstants{
    static readonly ID = "edit-game"
    static readonly TITLE = "Edit this game"
}

export abstract class PauseGameButtonConstants{
    static readonly ID = "pause-game"
    static readonly TITLE = "Pause Applications"
    static readonly MESSAGE = "Applications for this game are paused"
}

export abstract class PlayGameButtonConstants{
    static readonly ID = "enable-game"
    static readonly TITLE = "Allow Applications"
    static readonly MESSAGE = "Applications are reenabled"
}

export abstract class AcceptApplicationButtonConstants{
    static readonly ID = "accept-application"
    static readonly TITLE = "Accept Application"
    static readonly MESSAGE_DM = "Application Accepted - "
    static readonly MESSAGE_PERSONAL = "Hey! Welcome to "
    static readonly STATUS_ID = "Status"
    static readonly STATUS_MESSAGE = "You have Accepted this application"
}

export abstract class RejectApplicationButtonConstants{
    static readonly ID = "reject-application"
    static readonly TITLE = "Reject/Rescind"
    static readonly MESSAGE_DM = "Application Rejected - "
    static readonly MESSAGE_DM_RESCIND = "Application Rescinded - "
    static readonly MESSAGE_PERSONAL = "Sorry, the DM decided to go with someone else for "
    static readonly MESSAGE_PERSONAL_RESCIND = "You have rescinded your application for "
    static readonly STATUS_ID = "Status"
    static readonly STATUS_MESSAGE = "This application has been rejected/rescinded"
}

export abstract class RemovePlayerButtonConstants{
    static readonly ID = "remove-player"
    static readonly TITLE = "Remove Player"
    static readonly MESSAGE_DM = "Application Removed - "
    static readonly MESSAGE_PERSONAL = "Sorry, the DM decided to go with someone else for "
    static readonly STATUS_ID = "Status"
    static readonly STATUS_MESSAGE = "This player has been removed"
}


export abstract class ApplyToGameModalConstants{
    static readonly ID = "apply-to-game-modal"
    static readonly MODAL_TITLE = 'Apply to '
    static readonly REPLY = 'You are applying to this game '
    static readonly DM = 'You have applied to '
}

export abstract class GameApplicationEmbedConstants{
    static readonly EMBED_COLOR = "#B4CEA7"
    static readonly FOOTER = 'Chief of Operations, at your service!'
    static readonly TITLE = 'New Application for '
    static readonly DESC = 'Submitted by '
}