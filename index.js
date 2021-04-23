console.clear()
const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.static('.'))

app.listen(8877, () => {
	console.log('Servidor iniciado na porta 8877')
})

const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 5000 })

const KEYS = {
	'Q': 0x2d, // L
	'E': 0x21, // R
	'I': 0x25, // TRIANGLE
	'J': 0x26, // SQUARE
	'K': 0x27, // CROSS
	'L': 0x28, // CIRCLE
	'ENTER': 0x42, // SELECT
	'SPACE': 0x3e, // START
	'ESC': 0x6f, // PAUSE
	'UP': 0x118, // UP
	'LEFT': 0x11a, // LEFT
	'DOWN': 0x119, // DOWN
	'RIGHT': 0x11b, // RIGHT
	'W': 0x33, // JOY UP
	'A': 0x1d, // JOY LEFT
	'S': 0x2f, // JOY DOWN
	'D': 0x20, // JOY RIGHT
	'F1': 0x2b, // LOAD
	'[': 0x2c, // SAVE
}

server.on('connection', socket => {
	socket.on('message', msg => {
		msg = msg.toUpperCase().split(' ')
		msg[1] = KEYS[msg[1].split(',')[0]] || msg[1]
		msg = msg.join(' ')

		console.log(msg)

		fs.writeFile('.LASTKEY.txt', msg, err => {
			if (err) { return console.error(err) }
			console.log('The file was saved!')
		})
	})
})