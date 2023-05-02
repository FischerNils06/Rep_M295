const { rejects } = require("assert");
const { resolve } = require("path");


addiereNachVerzoegerung(3, 7, 2000);

async function simuliereVerzoegerung(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        })

    }

async function addiereNachVerzoegerung(a, b, ms) {
    try {
        await simuliereVerzoegerung(ms);
        console.log(a + b);
    }
    catch (err) {
        console.log(err);
    }
}

