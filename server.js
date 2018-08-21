const io =require('socket.io')();
io.on('connection',(client)=>{
  client.on('handleInput',()=>
  )
})














//------------------------------
const io = require('socket.io')();//constructs socket
io.on('connection', (client) => {//handles connection of a client so you can publish(emit) events to it
  client.on('subscribeToTimer', (interval) => {//responding to events emitted from client
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());//emits current date back to the client
    }, interval);//also emits the 'timer' event
  });
});

const port = 8000;
io.listen(port);//tells socket.io to start listening for clients
console.log('listening on port ', port);

//---------------------------------------Client Side
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));//subscribes to timer event emitted from server
  socket.emit('subscribeToTimer', 1000);//and then emit subscribeToTimer event to the server //server emits every second here
}//ordered this way as a race condition

export { subscribeToTimer };//defines the function and exports

//----------------------------------React Side
/*import { subscribeToTimer } from './api';//api is the client side

constructor(props){//should be inside an app class
  super(props);
  state = {
  timestamp: 'no timestamp yet'
    };
  subscribeToTimer((err, timestamp) => this.setState({ 
    timestamp //*****************this is the function called cb (subscribeToTimer gets called inside the constructor)
  }));
}

render() {
  return (
    <div className="App">
      <p className="App-intro">
      This is the timer value: {this.state.timestamp}
      </p>
    </div>
  );
}*/

