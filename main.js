import input from "analiza-sync"
import data from "./data/data.js"
import { searchStock, operateOnStock, filterStocksByPrice } from "./utils/tradeFunc.js"

function trading(){
    const price = input("enter range price: ")
    const range = Boolean(+input("enter 0 for less then price or 1 for more then price: "))
    const companies = filterStocksByPrice(price, range)
    console.log(companies)
    const choice = input("enter id or company name: ")
    const company = searchStock(choice)
    console.log(`company detayls`, company)
    const operationchoice = input("enter buy or sell: ")
    const succede = operateOnStock(operationchoice, choice)
    return succede
}
let trade = false
while (!trade){
    trade = trading()
}
console.log(data)
console.log(`good lock your operation has succede`)

