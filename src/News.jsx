import React, { useEffect, useState } from 'react'

const News = () => {
    const [data, setdata] = useState([]);

    const getnewsapi = async () => {
        const res = await fetch(
            `https://newsapi.org/v2/everything?q=apple&from=2022-10-18&to=2022-10-18&sortBy=popularity&apiKey=4ce05c0b050a400ca73d55a48ff224cb`); //in pending state
        const actualdata = await res.json();
        // console.log(actualdata.articles);
        setdata(actualdata.articles);
    };

    
    useEffect(() => {
        getnewsapi();
    }, []);


    return (
        <>
            {
                data.map((elem) => {
                    const date = new Date(elem.publishedAt);
                    const mydate = date.toLocaleDateString();
                    return (
                        <div className="main">
                            <div className="main1">

                                <div className="content">
                                    <h2>{elem.title}</h2>
                                    <p>{elem.description}</p>

                                    <div className="date-time">
                                        <p>{mydate}</p>
                                        <p>{elem.source.name}</p>
                                        <a href={elem.url} target='_blank'> <button>Read More</button></a>
                                    </div>


                                </div>

                                <div className="myimage">
                                    <img style={{ height: "150px", width: "150px" }} src={elem.urlToImage} alt="img" />
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