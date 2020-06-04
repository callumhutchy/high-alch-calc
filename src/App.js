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

        <button id="sort" type="button" onClick={SortMaxProfit}>Sort by Max Profit</button>
        <button id="sort" type="button" onClick={SortProfit}>Sort by Individual Profit</button>

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
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (var key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function SortProfit() {
  document.getElementById("table-div").innerHTML = "";
  document.getElementById("table-div").innerHTML = '<table id="item_table"></table>';
  profitable.sort(CompareProfit);
  let table = document.querySelector("table");
  let data = Object.keys(profitable[0]);
  generateTable(table, profitable);
  generateTableHead(table, data);
}

function SortMaxProfit() {
  document.getElementById("table-div").innerHTML = "";
  document.getElementById("table-div").innerHTML = '<table id="item_table"></table>';
  profitable.sort(CompareMaxProfit);
  let table = document.querySelector("table");
  let data = Object.keys(profitable[0]);
  generateTable(table, profitable);
  generateTableHead(table, data);
}

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

  //console.log(processedData);
  return processedData;
}

async function WaitForData() {
  let p = await GetPrices();
  var natureRunePrice = p.find(obj => {
    return obj.id === 561;
  }).price;
  let i = await GetItems(natureRunePrice);
  ProcessPricesAndItems(p, i, natureRunePrice);
}

async function GetPrices() {
  let response = await fetch('HTTPS://api.runelite.net/runelite-1.6.17/item/prices');
  let data = await response.json();
  //console.log(data);
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
        var item = {
          id: id,
          name: i[index]["name"],
          highalch: highalch,
          price: ip,
          profit: prof,
          buy_limit: i[index]["buy_limit"],
          max_profit: i[index]["buy_limit"] * (highalch - (ip + natureRunePrice))
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