import { Client } from "@notionhq/client"
import { AppSent, Game } from "./dbConstants"

export async function FindGameEntryById(gameId: string) {
    const notion = new Client({ auth: process.env.NOTIONTOKEN })
    const databaseId = Game.DB_ID
    try {
        var page = await notion.databases.query({
            database_id: databaseId,
            filter:{
                property: "ID",
                rich_text: {
                    equals: gameId
                }
            }
        })
        console.log("Retrieved Game Entry: "+ page.results[0].id)
        return page.results[0].id
    } catch (error) {
        console.error(error)
        return ""
    }
}