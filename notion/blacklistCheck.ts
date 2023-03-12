import { Client } from "@notionhq/client"
import { AppSent, Blacklist } from "./dbConstants"

export async function FindUserInBlacklist(userId: string) {
    const notion = new Client({ auth: process.env.NOTIONTOKEN })
    const databaseId = Blacklist.DB_ID
    try {
        var page = await notion.databases.query({
            database_id: databaseId,
            filter:{
                property: "ID",
                rich_text: {
                    equals: userId
                }
            }
        })
        if (page!= null && page.results != null && page.results.length != 0){
            console.log("Retrieved User Entry: "+ page.results[0].id)
            return true
        }
        return false
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function AddUserToBlacklist(userName:string, userId: string) {
    const notion = new Client({ auth: process.env.NOTIONTOKEN })
    const databaseId = Blacklist.DB_ID
    try {
        await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "Name": {
                    title: [
                        {
                            "text": {
                                "content": userName
                            }
                        }
                    ]
                },
                "ID": {
                    rich_text: [
                        {
                            "text": {
                                "content": userId
                            }
                        }
                    ]
                }
            },
        })
        console.log("Notion Entry Added for new blacklisted user")
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}