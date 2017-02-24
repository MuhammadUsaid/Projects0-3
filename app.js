var menu = ["Table App", "Menu App", "ToolTip App", "Timer"];
class Link extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let link = this.props.title + ".html";
        if (link == "Menu App.html") {
            link = "index.html";
        }
        return React.createElement(
            "a",
            { href: link },
            this.props.title
        );
    }
}
class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "div",
            null,
            menu.map((v, i) => {
                return React.createElement(
                    "span",
                    { key: i },
                    React.createElement(Link, { title: v })
                );
            })
        );
    }
}
ReactDOM.render(React.createElement(Menu, null), document.getElementById('one'));
