
export abstract class ApplyGameButtonConstants{
    static readonly ID = "apply-to-game"
    static readonly TITLE = "Apply to this game"
}

export abstract class EditGameButtonConstants{
    static readonly ID = "edit-game"
    static readonly TITLE = "Edit this game"
}

export abstract class AcceptApplicationButtonConstants{
    static readonly ID = "accept-application"
    static readonly TITLE = "Accept this Application"
    static readonly PERMISSION = "AYO! You are SO NOT the DM!"
    static readonly MESSAGE_DM = "Application Accepted - "
    static readonly MESSAGE_PERSONAL = "Hey! Welcome to "
    static readonly STATUS_ID = "Status"
    static readonly STATUS_MESSAGE = "You have Accepted this application"
}

export abstract class RejectApplicationButtonConstants{
    static readonly ID = "reject-application"
    static readonly TITLE = "Reject/Rescind"
    static readonly PERMISSION = "AYO! You are SO NOT the DM!"
    static readonly MESSAGE_DM = "Application Rejected/Rescinded - "
    static readonly MESSAGE_PERSONAL = "Sorry, the DM decided to go with someone else for "
    static readonly MESSAGE_PERSONAL_RESCIND = "You have rescinded your application for "
    static readonly STATUS_ID = "Status"
    static readonly STATUS_MESSAGE = "This application has been rejected/rescinded"
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
    static readonly DESC = 'Sumbitted by '
}