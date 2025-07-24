import {expect} from '@playwright/test'

export class PaymentPage{
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator("[data-qa = 'active-discount-container']")
                                .locator("[data-qa = 'discount-code']")

        this.discountInput = page.locator("[placeholder = 'Discount code']")
        this.activateDiscountButton = page.locator("[data-qa = 'submit-discount-button']")

        this.discountedValue = page.locator("[data-qa = 'total-with-discount-value']")
        this.totalValue = page.locator("[data-qa = 'total-value']")
        this.discountActivateMessage = page.locator("[data-qa='discount-active-message']")
        this.creditCardOwner = page.getByPlaceholder("Credit card owner")
        this.creditCardNumber = page.getByPlaceholder("Credit card number")
        this.creditValidUntil = page.getByPlaceholder("Valid until")
        this.creditCardCVC = page.getByPlaceholder("Credit card CVC")
        this.payButton = page.locator("[data-qa = 'pay-button']")
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
     
        // option 1
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
        //Option 2 - slow typing using keyboard
        //await this.discountInput.focus()
        //await this.page.keyboard.type(code, {delay : 500})
        //expect(await this.discountInput.inputValue()).toBe(code)
        
        expect(this.discountedValue.isVisible()).toBeFalsy
        expect(this.discountActivateMessage.isVisible()).toBeFalsy
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()

        await this.discountActivateMessage.waitFor()
        
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText()
        const discountValueOnlyStringNumber = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        expect(discountValueNumber).toBeLessThan(totalValueNumber)
    } 
    fillPaymentDetails = async (details) => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(details.owner)
        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(details.cardNumber)
        await this.creditValidUntil.waitFor()
        await this.creditValidUntil.fill(details.validUntil)
        await this.creditCardCVC.waitFor()
        await this.creditCardCVC.fill(details.cvc)
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/,{timeout: 3000})
    }
}