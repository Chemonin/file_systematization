const express = require('express');

const app = express();
process.env.SHOWTIME = 10000;
process.env.INTERVAL = 2000;

let finishTimer = null;

const setTimer = () => {
    return new Promise((resolve) => {
        let intervalId = setInterval(() => {
            process.env.SHOWTIME -= process.env.INTERVAL;
            console.log(new Date().toUTCString());
            if (process.env.SHOWTIME <= 0) {
                clearInterval(intervalId);
                resolve(new Date().toUTCString())
                console.log('finish session');
                process.env.SHOWTIME = 10000;
            }
        }, process.env.INTERVAL)
    })
}

const sendTime = (response, timer) => {
    new Promise((resolve) => {
        timer.then((data) => {
            resolve(data);
        })
    }).then((clientTime) => {
        response.send(clientTime)
        finishTimer = null;
    })
}
app.get('/', (req, res) => {
    if (process.env.SHOWTIME === 10000) {
        finishTimer = null;
    }
    if (!finishTimer) {
        finishTimer = setTimer();
        sendTime(res, finishTimer);
    } else {
        sendTime(res, finishTimer);
    }
})

app.listen(3000, () => {
    console.log('start server');
});