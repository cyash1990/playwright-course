import { test } from "@playwright/test"
import { MyAccountPage } from "./../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/loginToken.js" 
import { adminDetails } from "./../data/userDetails.js"

test("My account using cookie injection", async ({page}) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)

    // ** indicate that it can match anything
    await page.route("**/api/user**",  async (route, request) => {
        await route.fulfill({ 
            status : 500, 
            contentType : "application/json",
            body : JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    })

    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    },  [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})
 