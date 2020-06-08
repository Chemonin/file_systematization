const express = require('express');

const app = express();
process.env.SHOWTIME = 10000;
process.env.INTERVAL = 2000;

app.get('/', (req, res) => {
    let intervalId = setInterval(() => {
        console.log(new Date().toUTCString());
        process.env.SHOWTIME -= process.env.INTERVAL;
        if (process.env.SHOWTIME < 0) {
            clearInterval(intervalId);
            res.send(new Date().toUTCString())
        }
    }, process.env.INTERVAL)
})

app.listen(3000, () => {
    console.log('start server');
});