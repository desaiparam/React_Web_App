import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Watchlist from './components/WatchList/Watchlist';
import Portfolio from './components/PortFolio/Portfolio';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './style.css';
// import SearchBar from './components/SearchBar';
import SearchBar from './components/SearchBar';




function FullPage() {
    const [search, setSearch] = useState(false);
    const [watchlist, setWatchlist] = useState(false);
    const [portfolio, setPortfolio] = useState(false);
    const [yourWatchList, setYourWatchList] = useState([]);
    const [spinnerStatus, setSpinnerState] = useState(false);
    const [AllQuoteDataWatchlist, setAllQuoteDataWatchlist] = useState({});
    const [newStockName, setStockName] = useState("home");
    const [starClicked, setStarClicked] = useState(false);
    const [wallet, setWallet] = useState('');
    const [yourPortfolioNotPresent, setYourPortfolioNotPresent] = useState(true)
    const [yourPortfolio, setYourPortfolio] = useState([]);
    const [portflioSpinnerStatus, setPortfolioSpinnerStatus] = useState(false);
    const [allPortfolioData, setAllPortfolioData] = useState([]);
    
    const [portfolioData, setPortfolioData] = useState([]);
    const [sellButtonToggle, setSellButtonToggle] = useState(false);
    // console.log("newStockName", newStockName)

    // console.log("yourWar", yourWatchList);
    useEffect(() => {
        setSpinnerState(true);
        setAllQuoteDataWatchlist([]);
        if (yourWatchList.length === 0) {
            setSpinnerState(false);
            return;
        }
        const promises = yourWatchList.map(async (item) => {
            const t = item.Title;
            const data = await fetchQuoteData(t);
            // console.log("data", data);
            setAllQuoteDataWatchlist((prevState) => ({
                ...prevState,
                [t]: data,
            }));
            return { [t]: data };
        });

        Promise.all(promises).then((allData) => {
            setSpinnerState(false);
        });
    }, [yourWatchList]);

    useEffect(() => {
        setPortfolioSpinnerStatus(true);
        setAllPortfolioData([]);
        if (yourPortfolio.length === 0) {
            setPortfolioSpinnerStatus(false);
            return;
        }
        const promises = yourPortfolio.map(async (item) => {
            const t = item.Title;
            const data = await fetchQuoteData(t);
            const setPortfolioData = await fetchDbData(t);
            console.log("setPortfolioData",setPortfolioData );
            setAllPortfolioData((prevState) => ({
                ...prevState,
                [t]: data,
                
            }));
            return { [t]: data };
        });

        Promise.all(promises).then((allData) => {
            setPortfolioSpinnerStatus(false);
        });
    }, [yourPortfolio]);
    // console.log("aalPortfolioData", allPortfolioData);

    async function fetchDbData(title) {
        fetch(`https://project3-stockwebapp.wl.r.appspot.com/getSinglePortfolio/${title}`,
            { method: "GET" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data === null) {
                    console.log("No data found for the given ticker");
                    setPortfolioData(0);
                    // setSellButtonToggle(true);
                } else {
                    console.log("setPortfolioData", data);
                    // setSellButtonToggle(true);
                    setPortfolioData(data);
                }
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
        fetch(`https://project3-stockwebapp.wl.r.appspot.com/Wallet`)
            .then(response => response.json())
            .then(walletData => {
                console.log("walletData", walletData);
                const convertedWalletData = parseFloat(walletData[0].Wallet);
                console.log("convertedWalletData", convertedWalletData);
                setWallet(convertedWalletData);
            }).catch(error => console.error('Error:', error))
    }

    async function fetchQuoteData(title) {
        // console.log("fetchQuoteData", title);
        try {
            const response = await fetch(`https://project3-stockwebapp.wl.r.appspot.com/quote/${title}`);
            const quoteData = await response.json();
            return quoteData;
        } catch (error) {
            console.error('Error fetching quote data:', error);
            return null;
        }
    }

    return (

        <div>

            <Router>
                <div id="page-container">
                    <div id="content-wrap">
                        <NavBar search={search} watchlist={watchlist} portfolio={portfolio} setWatchlist={setWatchlist} setPortfolio={setPortfolio} setSearch={setSearch}/>
                        <Routes>

                            {/* <Route exact path="/search" element={<Navigate to="/search/home"/> } /> */}
                            <Route path="/search/home" element={<SearchBar setStarClicked={setStarClicked} starClicked={starClicked}
                           setWallet={setWallet} wallet={wallet}
                                setPortfolioData={setPortfolioData} portfolioData={portfolioData} setSellButtonToggle={setSellButtonToggle} sellButtonToggle={sellButtonToggle}/>} />


                            <Route path="/search/:stock" element={<SearchBar setStarClicked={setStarClicked} starClicked={starClicked}
                             setWallet={setWallet} wallet={wallet}
                                setPortfolioData={setPortfolioData} portfolioData={portfolioData} setSellButtonToggle={setSellButtonToggle} sellButtonToggle={sellButtonToggle}/>} />


                            <Route path="/watchlist" element={<Watchlist setStockName={setStockName} setYourWatchList={setYourWatchList}
                                setSpinnerState={setSpinnerState} spinnerStatus={spinnerStatus} yourWatchList={yourWatchList}
                                AllQuoteDataWatchlist={AllQuoteDataWatchlist} setStarClicked={setStarClicked} setWatchlist={setWatchlist} setPortfolio={setPortfolio} setSearch={setSearch}/>} />


                            <Route path="/portfolio" element={<Portfolio setYourPortfolioNotPresent={setYourPortfolioNotPresent}
                                setYourPortfolio={setYourPortfolio} setWallet={setWallet} yourPortfolioNotPresent={yourPortfolioNotPresent}
                                yourPortfolio={yourPortfolio} wallet={wallet} setPortfolioSpinnerStatus={setPortfolioSpinnerStatus}
                                portflioSpinnerStatus={portflioSpinnerStatus} allPortfolioData={allPortfolioData}
                                setPortfolioData={setPortfolioData} portfolioData={portfolioData}  setSellButtonToggle={setSellButtonToggle} sellButtonToggle={sellButtonToggle} setWatchlist={setWatchlist} setPortfolio={setPortfolio} setSearch={setSearch}  setStockName={setStockName}/> } />


                            <Route exact path="*" element={<Navigate to="/search/home" />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>


        </div>

    )
}
const root = ReactDOM.createRoot(document.getElementById('MyFullWebPage'));
root.render(

    <FullPage />
);