class ToolTip extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "center",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Tool Tip"
                ),
                React.createElement(
                    "p",
                    null,
                    "Hover over the underline text"
                )
            ),
            React.createElement(
                "p",
                null,
                "Hello Every Body, how are you? I am ",
                React.createElement(
                    "span",
                    { className: "tooltip" },
                    "learning React",
                    React.createElement(
                        "span",
                        { className: "tooltiptext" },
                        "learning React"
                    )
                ),
                " and having fun with cool ToolTip. Just try to hover the ",
                React.createElement(
                    "span",
                    { className: "tooltip" },
                    "underline",
                    React.createElement(
                        "span",
                        { className: "tooltiptext" },
                        "underline"
                    )
                ),
                " text and you will see the ",
                React.createElement(
                    "span",
                    { className: "tooltip" },
                    "tooltip magic",
                    React.createElement(
                        "span",
                        { className: "tooltiptext" },
                        "tooltip magic"
                    )
                ),
                " in action."
            )
        );
    }
}

ReactDOM.render(React.createElement(ToolTip, null), document.getElementById('two'));
