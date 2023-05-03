import express from 'express'
import path from 'path'
const app = express()
const port = 3000
const __dirname = path.resolve();

function time() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    var hour = date.getHours()+2
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + second
}

const name_list = ["Emma","Liam","Olivia","Noah","Ava","Ethan","Charlotte","William","Sophia","James","Mia","Alexander","Amelia","Benjamin","Harper","Michael","Abigail","Daniel","Emily","Henry"]
var name = name_list[Math.floor(Math.random() * name_list.length)]     

app.get('/', (request, response) => {
  response.send('Hello World!')
})



app.get('/now', (request, response) => {
    response.send(time())
    })

app.get('/zli', (request, response) => {
    response.redirect('https://www.zli.ch')
    })

app.get('/name', (request, response) => {
    response.send(name)
    })

app.get('/html', (request, response) => { 
    response.sendFile(__dirname + '/html.html')
    })

app.get('/image', (request, response) => {
    response.sendFile(__dirname + '/bild1.png')
    })

app.get('/teapot', (request, response) => {
    response.status(418).send('I am a teapot')
    })

app.get('/user-agent', (request, response) => {
    response.send(request.headers['user-agent'])
    })

app.get('/secret', (request, response) => {
    response.status(403).send('Access denied')
    })

app.get('/xml', (request, response) => {
    response.sendFile(__dirname + '/xxx.xml')
})

app.get('/me', (request, response) => {
    response.sendFile(__dirname + '/me.json')
    })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})