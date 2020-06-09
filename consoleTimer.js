const express = require('express');

const app = express();
process.env.SHOWTIME = 10000;
process.env.INTERVAL = 2000;

const setTimer = () => {
    let currentInterval = process.env.SHOWTIME;
    return new Promise((resolve) => {
        let intervalId = setInterval(() => {
            console.log(new Date().toUTCString());
            if (currentInterval <= 0) {
                clearInterval(intervalId);
                resolve(new Date().toUTCString())
            }
            currentInterval -= process.env.INTERVAL;
        }, process.env.INTERVAL)
    })
}
app.get('/', (req, res) => {
    setTimer().then((finishTime) => {
        console.log('finish time');
        res.send(finishTime)
    });
})

app.listen(3000, () => {
    console.log('start server');
});