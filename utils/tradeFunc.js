import input from "analiza-sync"
import data from "../data/data.js"

const { stocks } = data

export function searchStock(identifier) {
    return stocks.filter(stock => stock.id == identifier || stock.name == identifier)
}

export function filterStocksByPrice(givenPrice, above) {
    return stocks.filter((stock) => {
        if (above) { return stock.currentPrice >= givenPrice }
        else { return stock.currentPrice < givenPrice }
    })
}

export function operateOnStock(operation, identifier) {
    if (operation === "buy" || operation === "sell") {
        const company = searchStock(identifier)
        if (company.length) {
            
            let amount = +input(`how many stocks do you want to ${operation}?: `)
            if (operation === "buy" && company[0].availableStocks >= amount) {
                company[0].availableStocks -= amount
                updateCompanyPrice(company, operation)
                console.log(`company price updated to ${company[0].currentPrice} in 5%`)
                updateCategoryPrice(company[0].category, operation)
                console.log(`all companies in category ${company[0].category} updated in 1%`)
                return true
            }
            else if (operation === "sell")
                company[0].availableStocks += amount
                updateCompanyPrice(company[0], operation)
                console.log(`company price updated to ${company[0].currentPrice} in 5%`)
                updateCategoryPrice(company[0].category, operation)
                console.log(`all companies in category ${company[0].category} updated in 1%`)
                return true
        }
        else {
            console.log("no such a company has found")
            return false
        }
    }
    else {
        console.log("no such an operation has found")
        return false
    }
}


function updateCompanyPrice(company, operation) {
    company[0].previousPrices.push(company[0].currentPrice)
    if (operation === "buy") {
        company[0].currentPrice *= 1.05
        
    }
    else if (operation === "sell") {
        company[0].currentPrice *= 0.95
    }

}

function updateCategoryPrice(category, operation) {
    stocks.forEach((company) => {
        company.previousPrices.push(company.currentPrice)
        if (company.category == category){
            if (operation === "buy") {
                company.currentPrice *= 1.01
            }
            else if (operation === "sell") {
                company.currentPrice *= 0.99
            }
        }
        
    })
}
