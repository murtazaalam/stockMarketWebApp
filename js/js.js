getStocks = () => {
    var stocksUrl = "http://localhost:3000/stocks";
    var priceUrl = "https://priceapi.moneycontrol.com/pricefeed/bse/equitycash";
    fetch(stocksUrl)
    .then((res) => res.json())
    .then((data) => {
        data.map((stockData) => {
            fetch(`${priceUrl}/${stockData.name}`)
            .then((res) => res.json())
            .then((priceData) => {
                var element = `<div class='col-lg-3 col-md-4 col-sm-6 col-12'>
                                    <div class='my-card'>
                                        <div class='image'>
                                            <img src=${stockData.logo} class='img-fluid'/>
                                        </div>
                                        <div class='detail'>
                                            <p class='name'>${stockData.name}</p>
                                            <p class='name'>${priceData.data.HN}</p>
                                        </div>
                                        <div class='price'>
                                            <table class='table tablle-striped'>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>5 Day</th>
                                                        <th>30 Day</th>
                                                        <th>50 Day</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Price</td>
                                                        <td>${priceData.data['5DayAvg']}</td>
                                                        <td>${priceData.data['30DayAvg']}</td>
                                                        <td>${priceData.data['50DayAvg']}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class='market_detail'>
                                            <div>Agr Price: <b>${priceData.data.AVGP}</b></div>
                                            <div>Market Value: <b>${priceData.data.MKTCAP}</b></div>
                                        </div>
                                        <div class='company-detail'>
                                            <div>Full Name: <b>${priceData.data.SC_FULLNM}</b></div>
                                            <div>Type: <b>${priceData.data.SC_SUBSEC}</b></div>
                                        </div>
                                    </div>
                                </div>`; 
                $('#stocks').append(element);
                console.log(priceData)
            })
        })
    })
    .catch((err) => {
        console.log(err)
    })
}