import { expect } from '@playwright/test'

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameInput = page.locator("[data-qa= 'delivery-first-name']")
        this.lastNameInput = page.locator("[data-qa= 'delivery-last-name']")
        this.streetInput = page.locator("[data-qa= 'delivery-address-street']")
        this.postCodeInput = page.locator("[data-qa = 'delivery-postcode']")
        this.cityInput = page.locator("[data-qa= 'delivery-city']")
        this.countryDropdown = page.locator("[data-qa= 'country-dropdown']")
        this.saveAddressButton = page.locator("[data-qa = 'save-address-button']")
        this.savedAddressContainer = page.locator("[data-qa = 'saved-address-container']")
        this.savedAddressFirstName = page.locator("[data-qa = 'saved-address-firstName']")
        this.savedAddressLastName = page.locator("[data-qa = 'saved-address-lastName']")
        this.savedAddressStreet = page.locator("[data-qa = 'saved-address-street']")
        this.savedAddressPostcode = page.locator("[data-qa = 'saved-address-postcode']")
        this.savedAddressCity = page.locator("[data-qa = 'saved-address-city']")
        this.savedAddresscountry = page.locator("[data-qa = 'saved-address-country']")
        this.continueToPaymentsButton = page.getByRole('button', {name: 'Continue to payment'})
    }

    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
            
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAddress.postcode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        //expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)

        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCodeInput.inputValue())
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        expect(await this.savedAddresscountry.first().innerText()).toBe(await this.countryDropdown.inputValue()) 
    }

    continueToPayment = async () => {
        await this.continueToPaymentsButton.waitFor()
        await this.continueToPaymentsButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }
}
 

