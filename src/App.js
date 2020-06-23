import React from 'react';
import logo from './logo.svg';
import './App.css';

var itemsToCheck = null;
var prices = [];
var profitable = [];

function App() {
  WaitForData();
  return (
    <div className="App">
      <header className="App-header">
        <h3>
        Hutchy's High Alch list
        </h3>
        <div id="sortbuttons">
        <button id="sort" type="button" onClick={SortByMaxProfit}>Sort by Max Profit</button>     
        <button id="sort" type="button" onClick={SortByProfit}>Sort by Individual Profit</button>
        </div>
        
        <div id="table-div">
          <table id="item_table">

          </table>
        </div>
      </header>
    </div>
  );
}

export default App;

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let readableName = "";
    switch (key) {
      case "icon":
        readableName = "";
        break;
      case "name":
        readableName = "Name";
        break;
      case "highalch":
        readableName = "High Alch Value";
        break;
      case "price":
        readableName = "GE Price";
        break;
      case "profit":
        readableName = "Individual Profit";
        break;
      case "buy_limit":
        readableName = "Buy Limit";
        break;
      case "max_profit":
        readableName = "Max Profit";
        break;
      case "initial_capital":
        readableName = "Initial Cash";
        break;
    }
    let text = document.createTextNode(readableName);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (var key in element) {
      let cell = row.insertCell();
      switch (typeof element[key]) {
        case 'number':
        case 'string':
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
          break;
        case 'object':
          let obj = document.createElement("IMG");
          obj.src = element[key].src;
          cell.appendChild(obj);
      }
    }
  }
}

function SortByProfit() {
  SortProfit(CompareProfit);
}

function SortByMaxProfit() {
  SortProfit(CompareMaxProfit);
}

function SortProfit(compare) {
  document.getElementById("table-div").innerHTML = "";
  document.getElementById("table-div").innerHTML = '<table id="item_table"></table>';
  profitable.sort(compare);
  let table = document.querySelector("table");
  let data = Object.keys(profitable[0]);
  generateTable(table, profitable);
  generateTableHead(table, data);
}

//Retrieve all items from a complete list of OSRS items, and then filtering by items that have High alch values and we can buy on the GE.
//TODO: Might be worth looking into creating our own version with the information already stripped out. We would need to update that ourself though.
async function GetItems(natureRunePrice) {
  let response = await fetch('https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-complete.json');
  let data = await response.json();
  var processedData = [];

  for (var key in data) {
    if (!data.hasOwnProperty(key)) continue;

    var obj = data[key];
    var highalch = obj["highalch"];
    var tradeable = obj["tradeable_on_ge"];
    if (highalch != null && highalch > natureRunePrice && tradeable != null && tradeable == true) {
      processedData.push(obj);
    }
  }

  return processedData;
}

//Wait for our API calls to finish and get the current price for nature runes for later
async function WaitForData() {
  let p = await GetPrices();
  var natureRunePrice = p.find(obj => {
    return obj.id === 561;
  }).price;
  let i = await GetItems(natureRunePrice);
  ProcessPricesAndItems(p, i, natureRunePrice);
}

//Get current GE prices from Runelite API, Runelite API is more reliable than other APIs i've tried
async function GetPrices() {
  let response = await fetch('HTTPS://api.runelite.net/runelite-1.6.20/item/prices');
  let data = await response.json();
  return data;
}

function ProcessPricesAndItems(p, i, natureRunePrice) {
  console.log(p);
  console.log(i);
  if (i != null && p != null && i != undefined && p != undefined) {
    for (var index = 0; index < i.length; index++) {
      var id = i[index]["id"];
      var highalch = i[index]["highalch"];
      var ip = p.find(o => {
        return o["id"] === id;
      }).price;
      var prof = highalch - (ip + natureRunePrice);
      if ((highalch > ip + natureRunePrice) && prof > 100) {
        var icon = new Image();
        icon.src = 'data:image/png;base64,' + i[index]["icon"];
        var item = {
          icon: icon,
          name: i[index]["name"],
          highalch: highalch,
          price: ip,
          profit: prof,
          buy_limit: i[index]["buy_limit"],
          max_profit: i[index]["buy_limit"] * (highalch - (ip + natureRunePrice)),
          initial_capital: ip * i[index]["buy_limit"]
        };
        profitable.push(item);
      }
    }
  }
  profitable.sort(CompareMaxProfit);
  console.log(profitable);

  let table = document.querySelector("table");
  let data = Object.keys(profitable[0]);

  generateTable(table, profitable);
  generateTableHead(table, data);

}


//Sorting functions
function CompareMaxProfit(a, b) {
  const profitA = a.max_profit;
  const profitB = b.max_profit;

  let comparison = 0;
  if (profitA > profitB) {
    comparison = -1;
  } else {
    comparison = 1;
  }
  return comparison;
}

function CompareProfit(a, b) {
  const profitA = a.profit;
  const profitB = b.profit;

  let comparison = 0;
  if (profitA > profitB) {
    comparison = -1;
  } else {
    comparison = 1;
  }
  return comparison;
}