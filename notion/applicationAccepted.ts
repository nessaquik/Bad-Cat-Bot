import { Client } from "@notionhq/client"
import { AppAccepted } from "./dbConstants"

export async function AddAppAcceptedToNotion(user: string,
    gameId: string) {
    const notion = new Client({ auth: process.env.NOTIONTOKEN })
    const databaseId = AppAccepted.DB_ID
    try {
        await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "Name": {
                    title: [
                        {
                            "text": {
                                "content": user
                            }
                        }
                    ]
                },
                "GameID": {
                    rich_text: [
                        {
                            "text": {
                                "content": gameId
                            }
                        }
                    ]
                }
            },
        })
        console.log("Notion Entry Added for acceptance")
    } catch (error) {
        console.error(error)
    }
}