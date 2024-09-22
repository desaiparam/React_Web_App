const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag"
const finnhubClient = new finnhub.DefaultApi()
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://paramd:pdcsci571@assignment3.wu1k3iy.mongodb.net/?retryWrites=true&w=majority&appName=Assignment3";
const uri = "mongodb+srv://paramd:GMTW5M6uDuhZanys@cluster0.vclvuf7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log("uri", uri);
const express = require('express')
const app = express()
var cors = require('cors')
const port = 8080 || process.env.PORT;
app.use(cors())
// app.get('/', (req, res) => {
//   res.redirect('/search/home');

//   // res.setHeader('Content-Type', 'text/js');
// });

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {

  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.log("MongoDB database connection failed", err);
  }
}
run().catch(console.dir);


// app.get('/search/home', (req, res) => {
//   app.use(express.static('stockwebapp'));
//   const path = require('path');
//   res.sendFile(path.resolve(__dirname, 'stockwebapp', 'public', 'index.html'));
// });
app.get('/SearchData/:tickervalue', async (req, res) => {
  // console.log(tickervalue);
  const tickervalue = req.params.tickervalue.toUpperCase();
  const apiUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${tickervalue}&token=cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log(data);
  res.json(data);
});
app.get('/autocomplete/:inputValue', async (req, res) => {
  console.log("searching");
  const inputValue = req.params.inputValue;
  console.log(inputValue);
  const apiUrl = `https://finnhub.io/api/v1/search?q=${inputValue}&token=cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log(data);
  res.json(data);
});
app.get('/quote/:tickervalue', async (req, res) => {
  console.log("searching /quote/:tickervalue");
  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${inputValue}&token=cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log("quote", data);
  res.json(data);
});
app.get('/hourlyChartsWithDataFromQuote/:tickervalue/:toDate', async (req, res) => {

  // const moment = require('moment');
  // const to = req.params.toDate;
  const qtime = req.params.toDate * 1000;
  const today = new Date(qtime);
  const ago = new Date(qtime - 86400000);
  
  // Extracting year, month, and day for 'today'
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1; // getMonth() returns month from 0-11
  const todayDay = today.getDate();
  
  // Formatting month and day for 'today'
  const formattedTodayMonth = todayMonth < 10 ? '0' + todayMonth : todayMonth;
  const formattedTodayDay = todayDay < 10 ? '0' + todayDay : todayDay;
  
  // Final formatted 'todaydate'
  const todaydate = todayYear + '-' + formattedTodayMonth + '-' + formattedTodayDay;
  
  // Extracting year, month, and day for 'ago'
  const agoYear = ago.getFullYear();
  const agoMonth = ago.getMonth() + 1; // getMonth() returns month from 0-11
  const agoDay = ago.getDate();
  
  // Formatting month and day for 'ago'
  const formattedAgoMonth = agoMonth < 10 ? '0' + agoMonth : agoMonth;
  const formattedAgoDay = agoDay < 10 ? '0' + agoDay : agoDay;
  
  // Final formatted 'agodate'
  const agodate = agoYear + '-' + formattedAgoMonth + '-' + formattedAgoDay;
  
  console.log(todaydate); // Outputs today's date in yyyy-mm-dd format
  console.log(agodate);  // Outputs yesterday's date in yyyy-mm-dd format
  // return year + '-' + formattedMonth + '-' + formattedDay;

  // const from = req.params.from;
  //    console.log("getHumanReadableTime",time);
  // const fromDate = new Date(from * 1000);

  

  // const toDate = new Date(to * 1000);

  // const fromDate = moment(from).format('YYYY-MM-DD');
  // const toDate = moment(to).format('YYYY-MM-DD');

  // var formattedMonth = fromDate.getMonth() + 1;

  // formattedMonth = formattedMonth < 10 ? '0' + formattedMonth : formattedMonth;

  // var yesterdayFormattedDate = fromDate.getFullYear() + "-" + formattedMonth + "-" + fromDate.getDate()

  // var formattedDate = toDate.getFullYear() + "-" + formattedMonth + "-" + toDate.getDate()

  // console.log("yesterdayFormattedDate", yesterdayFormattedDate);
  // console.log("formattedDate", formattedDate);

  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  const url = `https://api.polygon.io/v2/aggs/ticker/${inputValue}/range/1/hour/${agodate}/${todaydate}?adjusted=true&sort=asc&apiKey=3zP2RsM5K29ZN5n4XJCT78BNolLjYncG`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log("hourlycharts", data);
  res.json(data);
});
app.get('/hourlycharts/:tickervalue', async (req, res) => {
  var currentDate = new Date();
  let dayBeforeYesterday = ('0' + (currentDate.getDate() - 1)).slice(-2);
  let year = currentDate.getFullYear();
  let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  let day = ('0' + currentDate.getDate()).slice(-2);
  let formattedDate = `${year}-${month}-${day}`;
  let yesterdayFormattedDate = `${year}-${month}-${dayBeforeYesterday}`;

  // console.log(formattedDate);
  // console.log(yesterdayFormattedDate);
  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  const url = `https://api.polygon.io/v2/aggs/ticker/${inputValue}/range/1/hour/${yesterdayFormattedDate}/${formattedDate}?adjusted=true&sort=asc&apiKey=3zP2RsM5K29ZN5n4XJCT78BNolLjYncG`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log("hourlycharts",data);
  res.json(data);
});
app.get('/peers/:tickervalue', async (req, res) => {
  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  const apiUrl = `https://finnhub.io/api/v1/stock/peers?symbol=${inputValue}&token=cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log("peers",data);
  res.json(data);
});
app.get('/latestnews/:tickervalue', async (req, res) => {
  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  var currentDate = new Date();

  // Set 'dayBeforeYesterday' to be 7 days in the past from the current date
  let dayBeforeYesterday = new Date(currentDate);
  dayBeforeYesterday.setDate(currentDate.getDate() - 7);

  // Format 'dayBeforeYesterday' to YYYY-MM-DD format
  let year = dayBeforeYesterday.getFullYear();
  let month = ('0' + (dayBeforeYesterday.getMonth() + 1)).slice(-2);
  let day = ('0' + dayBeforeYesterday.getDate()).slice(-2);
  let yesterdayFormattedDate = `${year}-${month}-${day}`;

  // Now format the current date to YYYY-MM-DD format
  year = currentDate.getFullYear();
  month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  day = ('0' + currentDate.getDate()).slice(-2);
  let formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate);
  console.log(yesterdayFormattedDate);
  const apiUrl = `https://finnhub.io/api/v1/company-news?symbol=${inputValue}&from=${yesterdayFormattedDate}&to=${formattedDate}&token=cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log("latestnews",data);
  res.json(data);
});

app.get('/charts/:tickervalue', async (req, res) => {
  var currentDate = new Date();
  let year = currentDate.getFullYear();
  let twoYearsAgoYear = year - 2;
  let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  let day = ('0' + currentDate.getDate()).slice(-2);
  let formattedDate = `${year}-${month}-${day}`;
  let twoYearsAgoDate = `${twoYearsAgoYear}-${month}-${day}`;
  console.log(formattedDate);
  console.log(twoYearsAgoDate);
  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${inputValue}/range/1/day/${twoYearsAgoDate}/${formattedDate}?adjusted=true&sort=asc&apiKey=cpLt4xlGjIe4p5jK5GN63LHXox_Yy0Oq`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log("charts",data);
  res.json(data);
});
app.get('/insiderSentiment/:tickervalue', async (req, res) => {
  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  const apiUrl = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${inputValue}&from=2022-03-01&token=cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log("insiderSentiment",data);
  res.json(data);
});
app.get('/CompanyEarning/:tickervalue', async (req, res) => {
  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  const apiUrl = `https://finnhub.io/api/v1/stock/earnings?symbol=${inputValue}&token=cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log("CompanyEarning",data);
  res.json(data);
});
app.get('/recommendationTrends/:tickervalue', async (req, res) => {
  const inputValue = req.params.tickervalue.toUpperCase();
  console.log(inputValue);
  const apiUrl = `https://finnhub.io/api/v1/stock/recommendation?symbol=${inputValue}&token=cmsc2p9r01qlk9b17ka0cmsc2p9r01qlk9b17kag`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // console.log("recommendationTrends",data);
  res.json(data);
});

app.get('/Watchlist', async (req, res) => {
  // const ticker = req.params.ticker;
  console.log("Watchlist");
  // const db = client.db("Assignment3");
  // const collection = db.collection("Watchlist");
  // console.log("Watchlist", data);
  const database = client.db("sample_mflix");
  const collection = database.collection("Watchlist");
  const data = await collection.find({}).toArray();

  console.log(data);
  res.json(data);
});

app.delete('/deleteWatchlist/:ticker', async (req, res) => {
  const ticker = req.params.ticker;
  console.log("deleteWatchlist", ticker);
  const database = client.db("sample_mflix");
  const collection = database.collection("Watchlist");
  const data = await collection.deleteOne({ Title: ticker });
  console.log(data);
  res.json(data);
});
app.get('/gettingStar/:ticker', async (req, res) => {
  const ticker = req.params.ticker;
  console.log("gettingStart", ticker);
  const database = client.db("sample_mflix");
  const collection = database.collection("Watchlist");
  const data = await collection.findOne({ Title: ticker });
  if (data == null) {
    console.log("false");
    res.send(false);
  } else if (ticker == data.Title) {
    res.send(true);
    console.log("true");
  }
});

app.post('/addWatchlist/:ticker/:company', async (req, res) => {
  const ticker = req.params.ticker;
  const company = req.params.company;
  console.log("addWatchlist", ticker);
  console.log("addWatchlist", company);
  const database = client.db("sample_mflix");
  const collection = database.collection("Watchlist");
  const data = await collection.insertOne({ Title: ticker, Company: company });
  console.log(data);
  res.json(data);
});

app.get('/Portfolio', async (req, res) => {
  console.log("Portfolio");
  const database = client.db("sample_mflix");
  const collection = database.collection("Portfolio");
  const data = await collection.find({}).toArray();
  console.log(data);
  res.json(data);
});

app.get('/Wallet', async (req, res) => {
  console.log("Wallet");
  const database = client.db("sample_mflix");
  const collection = database.collection("Wallet");
  const data = await collection.find({}).toArray();
  console.log(data);
  res.json(data);
});
// app.get('/getSinglePortfolio/:ticker', async (req, res) => {
//   const ticker = req.params.ticker;
//   console.log("getSinglePortfolio", ticker);
//   const database = client.db("sample_mflix");
//   const collection = database.collection("Portfolio");
//   const data = await collection.findOne({ Title: ticker });
//   console.log(data);
//   res.json(data);
// });
app.post('/addPortfolio/:ticker/:company/:quantity/:price', async (req, res) => {
  const ticker = req.params.ticker;
  const company = req.params.company;
  const quantity = req.params.quantity;
  // const info = req.params.info;
  const price = Number(req.params.price);
  var newQuantity 
  var newPrice
  console.log("addPortfolio", ticker);
  console.log("addPortfolio", company);
  console.log("addPortfolio", quantity);
  console.log("addPortfolio", price);
  const database = client.db("sample_mflix");
  const collection = database.collection("Portfolio");
  const getDataToCheck = await collection.findOne({ Title: ticker });
  console.log("getDataToCheck", getDataToCheck);
  
  console.log("newPrice", newPrice);
  if (getDataToCheck == null) {
    console.log("no ticker exsists so inset new")
    const data = await collection.insertOne({ Title: ticker, Company: company, Quantity: parseInt(quantity), Price: Math.round(price * 100) / 100 });
    console.log(data);
    res.json(data);
  } else {
    // if(info==1 ){
      newQuantity = parseInt(quantity)+parseInt(getDataToCheck.Quantity);
    console.log("newQuantity", newQuantity);
     newPrice = parseFloat(price) + parseFloat(getDataToCheck.Price);
     console.log("newPrice", newPrice);
  // }
    console.log("ticker exists so upadate", ticker);
    // // const upadatedQty = quantity - parseInt(getDataToCheck.Quantity);
    // if (quantity == 0) {
    //   console.log("quantity is 0 so delete");
    //   const data = await collection.deleteOne({ Title: ticker });
    //   console.log(data);
    //   res.json(data);
    // } else {
      const data = await collection.updateOne({ Title: ticker }, { $set: { Quantity: parseInt(newQuantity), Price: Math.round(newPrice * 100) / 100 } });
      console.log(data);
      res.json(data);
    // }
  }
});
app.post('/deleteProtfolio/:ticker/:company/:quantity/:price', async (req, res) => {
  const ticker = req.params.ticker;
  const company = req.params.company;
  const quantity = req.params.quantity;
  // const info = req.params.info;
  const price = Number(req.params.price);
  var newQuantity 
  var newPrice
  console.log("addPortfolio", ticker);
  console.log("addPortfolio", company);
  console.log("addPortfolio", quantity);
  console.log("addPortfolio", price);
  const database = client.db("sample_mflix");
  const collection = database.collection("Portfolio");
  const getDataToCheck = await collection.findOne({ Title: ticker });
  console.log("getDataToCheck", getDataToCheck);
  
  console.log("newPrice", newPrice);
  // if (getDataToCheck == null) {
  //   console.log("no ticker exsists so inset new")
  //   const data = await collection.insertOne({ Title: ticker, Company: company, Quantity: parseInt(quantity), Price: Math.round(price * 100) / 100 });
  //   console.log(data);
  //   res.json(data);
  // } else {
    // if(info==1 ){
      newQuantity = parseInt(getDataToCheck.Quantity)-parseInt(quantity);
    console.log("newQuantity", newQuantity);
     newPrice =   parseFloat(getDataToCheck.Price)-parseFloat(price)
  // }
    console.log("ticker exists so upadate", ticker);
    // const upadatedQty = quantity - parseInt(getDataToCheck.Quantity);
    if (newQuantity == 0) {
      console.log("quantity is 0 so delete");
      const data = await collection.deleteOne({ Title: ticker });
      console.log(data);
      res.json(data);
    } else {
      const data = await collection.updateOne({ Title: ticker }, { $set: { Quantity: parseInt(newQuantity), Price: Math.round(newPrice * 100) / 100 } });
      console.log(data);
      res.json(data);
    }
  // }
});


app.get('/getSinglePortfolio/:ticker', async (req, res) => {
  const ticker = req.params.ticker;
  console.log("getSinglePortfolio", ticker);
  const database = client.db("sample_mflix");
  const collection = database.collection("Portfolio");
  const data = await collection.findOne({ Title: ticker });
  console.log(data);
  res.json(data);
});
app.post('/addWallet/:wallet', async (req, res) => {
  const wallet = Number(req.params.wallet);
  console.log("addWallet", wallet);
  // const info = req.params.info;
  const id = "1";
  const database = client.db("sample_mflix");
  const collection = database.collection("Wallet");
  const walletData = await collection.findOne({ id: id });
  // if(info==1){
    console.log("addWallet", walletData.Wallet);
    console.log("asdfg",wallet)
  const newWallet = walletData.Wallet - wallet;
  // }
  const data = await collection.updateOne({}, { $set: { Wallet: newWallet } });
  console.log(data);
  res.json(data);
});
app.post("/deleteWallet/:wallet", async (req, res) => {
  const wallet = Number(req.params.wallet);
  console.log("deleteWatchlist", wallet);
  const id = "1";
  const database = client.db("sample_mflix");
  const collection = database.collection("Wallet");
  const walletData = await collection.findOne({ id: id });
  // if(info==1){
    console.log("addWallet", walletData.Wallet);
    console.log("asdfg",wallet)
  const newWallet = walletData.Wallet + wallet;
  const data = await collection.updateOne({}, { $set: { Wallet: newWallet } });
  console.log(data);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
