class ToolTip extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <center>
                    <h1>Tool Tip</h1>
                    <p>Hover over the underline text</p>
                </center>
                <p>
                    Hello Every Body, how are you? I am <span className="tooltip">learning React<span className="tooltiptext">learning React</span></span> and having fun with cool ToolTip.
                    Just try to hover the <span className="tooltip">underline<span className="tooltiptext">underline</span></span> text and you will see the <span className="tooltip">tooltip magic<span className="tooltiptext">tooltip magic</span></span> in action.
                </p>
            </div>
        )
    }
}


ReactDOM.render(
    <ToolTip/>,document.getElementById('two')
)