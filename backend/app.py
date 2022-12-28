from flask import Flask, request
from flask_sock import Sock
import redis
import time

app = Flask(__name__)
sock = Sock(app)
r = redis.Redis(host='localhost', port=6379)

@app.route('/')
def index():
    value = request.args.get('value') or 'World'
    p = r.pubsub()
    p.subscribe('test')
    r.publish('test', value)
    return value

@sock.route('/echo')
def echo(ws):
    data = ws.receive()
    p = r.pubsub()
    p.subscribe(data)
    while True:
        message = p.get_message()
        if message:
            if message['type'] == 'message':
                if 'data' in message:
                    ws.send(message['data'].decode('ascii'))
        time.sleep(1)


if __name__ == '__main__':
    app.run()