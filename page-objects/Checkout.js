import {expect} from '@playwright/test'



export class Checkout {

    constructor(page) {
        this.page = page
        this.basketCards = this.page.locator("[data-qa = 'basket-card']")
        this.basketItemPrice = this.page.locator("[data-qa='basket-item-price']")
        this.basketItemRemoveButton = this.page.locator("[data-qa='basket-card-remove-item']")
        this.continueToCheckoutButton = this.page.locator('[data-qa = "continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()

        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace('$', '') // 499$ -> 499
            return parseInt(withoutDollarSign, 10)
        })

        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    continueToCheckout =  async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000}) //regex
         

    }
}