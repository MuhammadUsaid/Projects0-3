class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {time: '0',interval: null,class: 'hide'}
    }
    decreaseTime(a){
        if(this.state.time > 0){
            this.setState({time: --this.state.time})
        }
        else{
            this.setState({class: 'reveal'})
            clearInterval(this.state.interval)
            
        }
    }
    handleTimer(a){
        clearInterval(this.state.interval)
        let interval = setInterval(this.decreaseTime.bind(this,a),1000)
        this.setState({time: a, interval: interval,class: 'hide'})
    }
    render(){
        return (
            <div>
                <center><h1 id="timer-heading">Timer</h1></center>
                <div id="timer-button-div">
                    <button className="timer-button" onClick={this.handleTimer.bind(this,10)}>10 Seconds</button>
                    <button className="timer-button" onClick={this.handleTimer.bind(this,20)}>20 Seconds</button>
                    <button className="timer-button" onClick={this.handleTimer.bind(this,50)}> 50 Seconds</button>
                    <button className="timer-button" onClick={this.handleTimer.bind(this,65)}>65 Seconds</button>
                </div>
                <div id="timer-timeleft">TIME LEFT : {this.state.time}</div>
                <p className={this.state.class + ' timeover'}>Time Over</p>
            </div>
        )
    }
}

ReactDOM.render(
    <Timer/>,document.getElementById('two')
)