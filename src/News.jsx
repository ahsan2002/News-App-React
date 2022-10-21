import React, { useEffect, useState } from 'react';

import axios from 'axios';

const News = () => {
    const [data, setdata] = useState([]);
    const [query, setQuery] = useState();

    const getNews = (e) => {
        e.preventDefault();


        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: { q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': '85KnnuP4HzmshYuCcfjg1sCMFdYkp18e8NojsnQP6hFvDHXrBr',
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data.value);
                setdata(response.data.value)
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    function getTrendingNews() {

        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news',
            params: { safeSearch: 'Off', textFormat: 'Raw' },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': '85KnnuP4HzmshYuCcfjg1sCMFdYkp18e8NojsnQP6hFvDHXrBr',
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then(function (response) {
                console.log(response.data);

                setdata(response.data.value)

            }).catch(function (error) {
                console.error(error);
            });
    }



    useEffect(() => {

        getTrendingNews();

    }, []);


    return (
        <>
            <div className="center">
                <form onSubmit={getNews}>
                    <input
                        type="text"
                        placeholder="Enter your topic name"
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                    />
                    <button className='mybtn' type="submit">Get News</button>
                </form>
            </div>
            {
                data.map((elem) => {
                    const date = new Date(elem?.datePublished);
                    const mydate = date.toLocaleDateString();
                    return (
                        <div className="main" key={elem?.name}>
                            <div className="main1">

                                <div className="content">
                                    <a href={elem?.url} target='_blank' rel="noreferrer">

                                        <h2>{elem?.name}</h2>
                                    </a>
                                    <p>{elem?.description}</p>



                                    <div className="date-time">
                                        <p>{mydate}</p>
                                        <p>{elem?.provider[0]?.name}</p>
                                    </div>
                                </div>

                                <div className="myimage">
                                    <img style={{ height: "150px", width: "150px" }} src={elem?.image?.thumbnail?.contentUrl} alt="img" />
                                </div>


                            </div>
                        </div>
                    )

                })
            }
        </>
    )

}

export default News;