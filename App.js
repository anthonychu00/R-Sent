import React from 'react';
import {reddit} from './functionalitySnoo';//reddit is a snoowrap
import {client} from './stream';
import './styles.css';
import Plot from 'react-plotly.js';
import {BarChart} from 'react-easy-chart';
import {Legend} from 'react-easy-chart';
//import {Switch,Route} from 'react-router-dom';
var Sentiment =require('sentiment');
var sentiment = new Sentiment();
var interval=0;

var figure = {//where data for the plot will be stored
    data: [{
        x:[-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10],
        y:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        type:'bar'
    }],
    layout:{
        title:"Sentiments",
        
    }
};//*****************************************need to do some more html trickery */

class App extends React.Component{
    constructor(props){
        super(props);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleInput=this.handleInput.bind(this);//bind everything
        //this.handleNewComment=this.handleNewComment.bind(this);
        this.checkIt=this.checkIt.bind(this);
        this.state={
            text:"",
            commentNumber:"0",
            score:"0",
            results:figure.data,//plotly uses shallow comparison which only checks by reference/ can probably optimize later tp ut data itself here
            newLayout:figure.layout
        }
    }

    render(){
       return( 
        <div id='appl'>
       <InputBox onClick={this.handleInput}
       onChange={this.handleTextChange}/>
       <InfoBox onChange={this.handleNewComment}
       number={this.state.commentNumber}/>
       /*<Plot data={this.state.results} layout={this.state.newLayout}
       		onInitialized={ (mind) =>this.setState(mind) }
       		onUpdate={ (mind) =>  this.setState(mind) }/>*/
       <BarChart data={this.state.results} height={250} width={350}/>
       </div>
    );
    }

    handleInput(e){//starts a stream for the relevant keyword
        e.preventDefault();
        document.getElementById('keyword-input').innerHTML =this.state.text;
        if(interval!==0)
            clearInterval(interval);
 
        //clear stuff here with a new keyword entered
        console.log(`Alive`);
        var commentStream = client.CommentStream({
            "subreddit": "all", // optional, defaults to "all",
            "results": 1000,              // The number of results to request per request, more the larger the subreddit, about how many results you should get in 2 seconds. Defaults to 5
            "pollTime": 3000           // Time in between polls in milliseconds, defaults to 2000, 30 times a minute, in accordance with Reddit's 60req/min, allowing you to perform both comment and submission updates. Note that snoowrap will automatically wait to be in compliance with Reddit's Guidelines
        })

        commentStream.on("comment", function(comment) {//*********************use regex to remove links? */
            //console.log(`New comment by ${comment.author.name}`);
            //console.log(comment);
            //console.log('The extracted comment is "' +comment.body + '"');
            //document.getElementById('num').innerHTML=Number(document.getElementById('num').textContent)+1;//difference between Number() and parseInt()?
            //document.getElementById('latest-comment').innerHTML='Latest Comment "' +comment.body + '"';
            if(document.getElementById('keyword-input').textContent!==""&&comment.body.toString().toLowerCase().includes(document.getElementById('keyword-input').textContent.toString().toLowerCase()))
            {
                console.log("Here");
                console.log('The extracted comment is "' +comment.body + '"');
                document.getElementById('num').innerHTML=Number(document.getElementById('num').textContent)+1;//difference between Number() and parseInt()?
                document.getElementById('latest-comment').innerHTML=comment.body;
                var words= sentiment.analyze(comment.body);
                
                document.getElementById('score').innerHTML=Math.round(((words.score+Number(document.getElementById('score').textContent))/document.getElementById('num').textContent)*100)/100;//rounding to more easily see change

                //updates bar graph
                //var value=Math.round(words.score / 10) * 10;//start here next day
                var value=Math.round(words.score)
                console.log(words.score);
                console.log(value);//have value in another html thing?
                if(value>10)
                    value=10;
                else if(value<-10)
                    value=-10;
                figure.data[0].y[figure.data[0].x.indexOf(value)]+=1;
                console.log(figure.data[0].y);
                

            }//parsing a comment for links functionality later to add
            
        });//plotly stuff somewhere around here? 

        setTimeout(function() {
            commentStream.emit("stop"); // Stop recieving new events
        }, 100000);  
        
        //interval=setInterval(checkIt,1000)
        interval=setInterval(this.checkIt,500);
    }

    handleTextChange(e){//updates the state of text as the user types in letters
        e.preventDefault();
        this.setState({text:e.target.value});
        //document.getElementById('keyword-input').innerHTML ="Keyword: "+this.state.text;
    }

    checkIt(){
        //console.log("Hmmmmmmm");
    	const brandLayout = Object.assign({}, this.state.newLayout);
    	brandLayout.datarevision=Number(this.state.commentNumber);//***********
        this.setState({
                commentNumber:document.getElementById('num').textContent,
                score:document.getElementById('score').textContent,
                results:figure.data,
                newLayout:brandLayout
            })
        
    }

}

function InputBox(props){    
        return(
            <div id="iBorder">
                <form>
                <input type="text" name="query" onChange={props.onChange}/>
                <button name='search' value='Analyze' onClick={props.onClick}>Analyze</button>
            </form>
            </div>
        )  
}

function InfoBox (props){
       return( <div id='info'>
            <p id="keyword-input"></p>
            <h3 id="comment-number"># of comments: <span id='num'>0</span></h3>
            <h3 id="scoreWrapper">Score: <span id='score'>0</span></h3>
            <p id="latest-comment"></p>
        </div>)   
}

/*function GraphBox(props){
    return( <div id='graph'> 
    <Plot data={figure.data} layout={figure.layout}/>
    </div>)
}*/
export default App;
