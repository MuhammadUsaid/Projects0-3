var menu = ["Table App","Menu App","ToolTip App","Timer"]
class Link extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let link = this.props.title + ".html"
        if(link == "Menu App.html"){
            link = "index.html"
        }
        return <a href={link}>{this.props.title}</a>
    }
}
class Menu extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                {menu.map( (v,i) => {return <span key={i}><Link title={v}/></span>})}
            </div>
        )
    }
}
ReactDOM.render(
    <Menu />,document.getElementById('one')
)