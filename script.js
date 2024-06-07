document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.querySelector('#convertButton')
    const resultDiv = document.querySelector('#result')

    const apiKey = '9ad9ecef02498e4903b92c69'
    const apiUrl = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/'

    convertButton.addEventListener('click', () => {
        const amount = document.querySelector('#amount').value
        const fromCurrency = document.querySelector('#fromCurrency').value
        const toCurrency = document.querySelector('#toCurrency').value

        if (amount === '') {
            alert('Por favor, insira um valor para conversão')
            return
        }

        convertCurrency(amount, fromCurrency, toCurrency)
    })

    async function convertCurrency(amount, fromCurrency, toCurrency) {
        const response = await fetch(apiUrl + fromCurrency)
        const data = await response.json()

        if (data.result === 'success') {
            const exchangeRate = data.conversion_rates[toCurrency]
            const convertedAmount = amount * exchangeRate

            resultDiv.textContent = `${amount} ${fromCurrency} é igual a ${convertedAmount.toFixed(2)} ${toCurrency}`
        } else {
            resultDiv.textContent = 'Erro ao obter as taxas de câmbio'
        }
    }
})