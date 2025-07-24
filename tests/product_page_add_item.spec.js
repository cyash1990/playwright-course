import{ test, expect } from "@playwright/test"


 test.skip("Product Page Add to Basket", async ({page}) => {
     await page.goto("/")

     const addToBasket = page.locator("[data-qa='product-button']").first()
     const basketCounter = page.locator("[data-qa='header-basket-count']")
     const checkoutLink = page.getByRole("link", { name : "Checkout" })
     
     await addToBasket.waitFor()
     await expect(addToBasket).toHaveText("Add to Basket")
     await expect(basketCounter).toHaveText('0')
     
     await addToBasket.click()
     await expect(addToBasket).toHaveText("Remove from Basket")
     await expect(basketCounter).toHaveText('1')
     
     await checkoutLink.waitFor()
     await expect(page).toHaveTitle("Art Shopping Store")

     await checkoutLink.waitFor()
     await checkoutLink.click()

     await page.waitForURL('/basket')
     
      
 })
 