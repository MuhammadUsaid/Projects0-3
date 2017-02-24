class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: '0', interval: null, class: 'hide' };
    }
    decreaseTime(a) {
        if (this.state.time > 0) {
            this.setState({ time: --this.state.time });
        } else {
            this.setState({ class: 'reveal' });
            clearInterval(this.state.interval);
        }
    }
    handleTimer(a) {
        clearInterval(this.state.interval);
        let interval = setInterval(this.decreaseTime.bind(this, a), 1000);
        this.setState({ time: a, interval: interval, class: 'hide' });
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'center',
                null,
                React.createElement(
                    'h1',
                    { id: 'timer-heading' },
                    'Timer'
                )
            ),
            React.createElement(
                'div',
                { id: 'timer-button-div' },
                React.createElement(
                    'button',
                    { className: 'timer-button', onClick: this.handleTimer.bind(this, 10) },
                    '10 Seconds'
                ),
                React.createElement(
                    'button',
                    { className: 'timer-button', onClick: this.handleTimer.bind(this, 20) },
                    '20 Seconds'
                ),
                React.createElement(
                    'button',
                    { className: 'timer-button', onClick: this.handleTimer.bind(this, 50) },
                    ' 50 Seconds'
                ),
                React.createElement(
                    'button',
                    { className: 'timer-button', onClick: this.handleTimer.bind(this, 65) },
                    '65 Seconds'
                )
            ),
            React.createElement(
                'div',
                { id: 'timer-timeleft' },
                'TIME LEFT : ',
                this.state.time
            ),
            React.createElement(
                'p',
                { className: this.state.class + ' timeover' },
                'Time Over'
            )
        );
    }
}

ReactDOM.render(React.createElement(Timer, null), document.getElementById('two'));
