import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import MainSpinnner from "./MainSpinner";
import WatchlistData from "./WatchlistData";
import Alert from "react-bootstrap/Alert";

const Watchlist = (props) => {
  useEffect(() => {
    props.setWatchlistQuoteLoading(true);
    // props.setTickerArrayWatchlist([]);
    fetch("http://localhost:5500/Watchlist", { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        props.setTickerArrayWatchlist(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  return (
    <>
      <Container style={{ marginTop: "5%" }}>
        <h1 className="text-left">My Watchlist</h1>
        {props.watchlistQuoteLoading ? (
          <MainSpinnner />
        ) : Object.keys(props.AllQuoteDataWatchlist).length === 0 ? (
          <>
            <Alert variant="warning">
              Currently you don't have any Stock in your Watchlist.
            </Alert>
          </>
        ) : (
          <>
            {props.TickerArrayWatchlist.map((item, index) => {
              return (
                <WatchlistData
                  key={index}
                  item={item.Ticker}
                  name={item.Name}
                  quote={props.AllQuoteDataWatchlist[item.Ticker]}
                  setTickerArrayWatchlist={props.setTickerArrayWatchlist}
                  TickerArrayWatchlist={props.TickerArrayWatchlist}
                  setWatchlisted={props.setWatchlisted}
                  mainTicker={props.mainTicker}
                />
              );
            })}
          </>
        )}
      </Container>
    </>
  );
};
export default Watchlist;



// import React, { useState, useEffect } from "react";
// import Card from 'react-bootstrap/Card';
// import WatchListNoDataPresent from "./WatchListNoDataPresent";
// import StockCard from "./StockCard";
// import Spinner from 'react-bootstrap/Spinner';
// import CloseButton from 'react-bootstrap/CloseButton'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// // import ValidTicker from "../ValidTicker";

// export default function Watchlist({ setSearch, setWatchlist, setPortfolio, setStockName,spinnerStatus,setSpinnerState,watchlistData,setYourWatchList,setRemoveTicker,yourWatchList,AllQuoteDataWatchlist }) {
//     // const [WatchListDataNotPresent, setWatchListDataNotPresent] = useState(true);
//     // const [yourWatchList, setYourWatchList] = useState([]);
//     // const [yourWatchListTicker, setYourWatchListTicker] = useState([]);
//     // const [quoteData, setQuoteData] = useState([]);
//     // const [spinnerStatus, setSpinnerState] = useState(false);
//     // const [watchlistData, setWatchlistData] = useState([]);
//     // const [companyName, setCompanyName] = useState([]);

//     //     const [removeTicker, setRemoveTicker] = useState('');
//     // const [newDataSearch, setNewDataSearch] = useState([]);
//     const [WatchListDataNotPresent, setWatchListDataNotPresent] = useState(true);

//     useEffect(() => {
//         fetch(`http://localhost:5500/Watchlist`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setSpinnerState(true)
//                 setYourWatchList(data);
//                 if (data.length > 0) {
//                     setWatchListDataNotPresent(false);
//                 }
//                 // data.map(setYourWatchListTicker(yourWatchListTicker => [...yourWatchListTicker,data.Title]))
//             })
//             .catch(error => console.error('Error:', error))
//     }, [])

//     // useEffect(() => {
//     //     setYourWatchList(newDataSearch);
//     // }, [newDataSearch]);
//     // useEffect(() => {
//     //     yourWatchList.forEach(item => {
//     //         setYourWatchListTicker(prevYourWatchListTicker => [...prevYourWatchListTicker, item.Title]);
//     //         setCompanyName(prevCompanyName => [...prevCompanyName,{[item.Title]:item.Company}]);
//     //     })
//     // }, [yourWatchList]);

//     // useEffect(() => {
//     //     console.log("yourWatchList", yourWatchList);
//     //     const fetchAllQuoteData = async () => {
//     //         if (yourWatchList.length > 0) {
//     //             setSpinnerState(true);
//     //             const promises = yourWatchList.map(async (item) => {
//     //                 const t = item.Title;
//     //                 console.log("t", t);
//     //                 const quoteData = await fetchQuoteData(t); // Assuming item has a Ticker property
//     //                 setWatchlistData(prevWatchlistData => ([
//     //                     ...prevWatchlistData,
//     //                     { [t]: quoteData }
//     //                 ]));
//     //                 return { [t]: quoteData };
//     //             });

//     //             Promise.all(promises).then(() => {
//     //                 setSpinnerState(false);
//     //             });
//     //         }
//     //     }

//     //     fetchAllQuoteData();
//     // }, [yourWatchList]);

// // console.log("watchlistData in watchlist", watchlistData)
//     // useEffect(() => {
//     //     console.log("yourWatchList", yourWatchList);
//     //     if (yourWatchList.length > 0) {
//     //         // setSpinnerState(false);
//     //        yourWatchList.map(item => 
//     //         setYourWatchListTicker(yourWatchListTicker => [...yourWatchListTicker, item.Title]));
//     //         console.log("yourWatchList",yourWatchListTicker );
//     //         // // yourWatchList.forEach(item => {
//     //         // //     setCompanyName(companyName => ({
//     //         // //         ...companyName,
//     //         // //         [item.Title]: [...(companyName[item.Title] || []), item.Company]
//     //         // //     }));
//     //         // });
//     //     }

//     // }, [yourWatchList]);

//     // useEffect(() => {
//     //     const fetchAllQuoteData = () => {
//     //         if (yourWatchList.length > 0) {
//     //             setSpinnerState(true); // Set spinner state to true before fetching data
//     //             Promise.all(yourWatchList.map(item => {
//     //                 return fetchQuoteData(item.Title)
//     //                     .then(fetchedQuoteData => {
//     //                         console.log("fetchedQuoteData", fetchedQuoteData);
//     //                         return { title: item.Title, data: fetchedQuoteData };
//     //                     })
//     //                     .catch(error => {
//     //                         console.error('Error fetching quote data:', error);
//     //                         throw error; // Re-throw error to ensure it's caught by outer catch block
//     //                     });
//     //             }))
//     //                 .then(newData => {
//     //                     console.log("newData", newData);
//     //                     const updatedData = {};
//     //                     newData.forEach(item => {
//     //                         updatedData[item.title] = item.data;
//     //                     });
//     //                     setWatchlistData(updatedData);
//     //                     // setInterval(() => {
//     //                     setSpinnerState(false);
//     //                     // }, 200);
//     //                     // Set spinner state back to false after fetching data
//     //                     // setNewDataSearch(false);
//     //                 })
//     //                 .catch(error => {
//     //                     console.error('Error fetching quote data:', error);
//     //                     setSpinnerState(false); // Make sure to set spinner state to false in case of an error
//     //                 });
//     //         }
//     //     };

//     //     fetchAllQuoteData();
//     // }, [yourWatchList]);

//     // async function fetchQuoteData(title) {
//     //     console.log("fetchQuoteData", title);
//     //     try {
//     //         const response = await fetch(`http://localhost:5500/quote/${title}`);
//     //         const quoteData = await response.json();
//     //         return quoteData;
//     //     } catch (error) {
//     //         console.error('Error fetching quote data:', error);
//     //         return null;
//     //     }
//     // }


//     // useEffect(() => {
//     //     console.log("setRemoveTicker", removeTicker);
//     //     const deleteWatchList = async () => {
//     //         setWatchlistData([])
//     //         console.log("in remove ticker", watchlistData)
//     //         // if (removeTicker !== '') {
//     //             try {

//     //                 // spinnerStatus(true);
//     //                 const response = await fetch(`http://localhost:5500/deleteWatchlist/${removeTicker}`, {
//     //                     method: 'DELETE',
//     //                 });

//     //                 if (!response.ok) {
//     //                     throw new Error('Failed to delete from watchlist');
//     //                 }

//     //                 // Update your watchlist after successful deletion
//     //                 // setSpinnerState(true);
//     //                 // setNewDataSearch(true)
//     //                 const watchlistResponse = await fetch(`http://localhost:5500/Watchlist`);
//     //                 const watchlistData = await watchlistResponse.json();

//     //                 console.log("fuck u ",watchlistData);
//     //                 // setYourWatchList(watchlistData);
//     //                 setNewDataSearch(watchlistData)
//     //                 // setSpinnerState(false);
//     //                 if (watchlistData.length > 0) {
//     //                     setWatchListDataNotPresent(false);
//     //                 } else {
//     //                     setWatchListDataNotPresent(true);
//     //                 }
//     //             } catch (error) {
//     //                 console.error('Error:', error);
//     //             }
//     //         }
//     //     // }
//     //     deleteWatchList();
//     // }, [removeTicker]);

//     const selectImg = () => {
//         let imgArrow;
//         if (watchlistData.d >= 0) {
//             imgArrow = (
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fill="green"
//                     className="bi bi-caret-up-fill"
//                     viewBox="0 0 16 16"
//                 >
//                     <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
//                 </svg>
//             );
//         } else {
//             imgArrow = (
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fill="red"
//                     className="bi bi-caret-down-fill"
//                     viewBox="0 0 16 16"
//                 >
//                     <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
//                 </svg>
//             );
//         }
//         return imgArrow;
//     }
//     const removeTickerOnClick = (ticker) => {
//         setRemoveTicker(ticker);

//         console.log("removeTicker", ticker);

//     }
//     const sendDataToSearch = (ticker) => {
//         console.log("sendData", ticker);
//         setSearch(true);
//         setWatchlist(false);
//         setPortfolio(false);
//         setStockName(ticker);
//         // localStorage.setItem('ticker',JSON.stringify(ticker));
//         console.log("seatrch in stockcard", setSearch)
//         console.log("watchlist in stockcard", setWatchlist)
//         console.log("portfolio in stockcard", setPortfolio)
//         console.log("stockName in stockcard", setStockName)
//         // navigate(`/search/${ticker}`);
//     }
//     // useEffect(() => {
//     //     console.log("watchlistData in watchlist", watchlistData)
//     // }
//     // ),[watchlistData]);
//     // console.log("watchlistData", watchlistData)
//     // console.log("companyName in ws", companyName)
// useEffect(() => {
//     console.log("AllQuoteDataWatchlist in useEffect",AllQuoteDataWatchlist)
//     console.log("watchlistData in useEffect",watchlistData)
// },[AllQuoteDataWatchlist])

//     return (

//         <Card>
//             <h1>Watchlist</h1>
//             {spinnerStatus? ( // If spinnerStatus is true, render a Spinner
//                 <Spinner animation="border" />
//             ) : (
//                 console.log("watchlistdata in return",watchlistData),
//                 AllQuoteDataWatchlist .length==0? ( // If WatchListDataNotPresent is false
//                 (

//                         // <StockCard
//                         //     key={ticker.id}
//                         //     ticker={ticker}
//                         //     setSearch={setSearch}
//                         //     setWatchlist={setWatchlist}
//                         //     setPortfolio={setPortfolio}
//                         //     setStockName={setStockName}
//                         //     quoteData={quoteData}
//                         //     watchlistData={watchlistData[ticker]}
//                         //     companyName={companyName[ticker]}
//                         //     setRemoveTicker={setRemoveTicker}
//                         // />
//                         console.log("watchlistData in alert",watchlistData),
//                         console.log("AllQuoteDataWatchlist in alert",AllQuoteDataWatchlist),
//                         <WatchListNoDataPresent />

//                     ))

//                  : (
//                     yourWatchList.map(ticker => ( 
//                         console.log("spinner status in alert",spinnerStatus),
//                         console.log("ticker in yourwatchlist",ticker),
//                         console.log("watchlistData in yourwatchlist",AllQuoteDataWatchlist[ticker]),
//                     //     <Card key={ticker} >

//                     //     <CloseButton onClick={() => removeTickerOnClick(ticker)} />
//                     //     <Card.Body onClick={() => sendDataToSearch(ticker)}>

//                     //         <Row >
//                     //             <Col><Card.Title >{ticker.Title}</Card.Title></Col>
//                     //             {/* <Col><Card.Text style={{ color: watchlistData[ticker].d >= 0 ? 'green' : 'red' }}>{watchlistData[ticker].c}</Card.Text></Col> */}
//                     //         </Row>

//                     //         <Row>
//                     //             <Col><Card.Subtitle>{ticker.Company}</Card.Subtitle></Col>
//                     //             {/* <Col>   <Card.Text style={{ color: watchlistData[ticker].d >= 0 ? 'green' : 'red' }}>{selectImg()} {watchlistData[ticker].d} {watchlistData[ticker].dp !== undefined && watchlistData[ticker].dp !== null ? watchlistData[ticker].dp.toFixed(2) + '%' : ''}</Card.Text></Col> */}
//                     //         </Row>
//                     //     </Card.Body>
//                     // </Card>
//                     <StockCard
//                             key={ticker}
//                             // ticker={ticker}
//                             setSearch={setSearch}
//                             setWatchlist={setWatchlist}
//                             setPortfolio={setPortfolio}
//                             setStockName={setStockName}
//                             // quoteData={quoteData}
//                             AllQuoteDataWatchlist={AllQuoteDataWatchlist[ticker]}
//                             // companyName={companyName[ticker]}
//                             setRemoveTicker={setRemoveTicker}
//                         />
//                     ))
//                    // If WatchListDataNotPresent is true, render WatchListNoDataPresent component
//                 )
//             )}

//         </Card>

//     );
// }    

