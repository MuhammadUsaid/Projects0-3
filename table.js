var target = document.getElementById('app');
var headers = ['Name','Age','Education','Salary','Designation'];
var data = [
    ['Aslam','25','Bachelors','50000','Teacher'],
    ['Fahad','23','Inter','30000','Employee'],
    ['Alam','19','Inter','15000','Sportsman'],
    ['Yasir','22','Inter','25000','Web Designer'],
    ['Taha','28','Masters','60000','Teacher']
];
var Excel = React.createClass({
    PropTypes: {headers:React.PropTypes.arrayOf(React.PropTypes.string),data:React.PropTypes.arrayOf(React.PropTypes.string)},
    getDefaultProps: function(){},
    getInitialState: function(){
        return {
            headers: this.props.headers,
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null,
            search: false
        }
    },
    componentDidMount: function() {
      document.onkeydown = function(e) {
          if (e.altKey && e.shiftKey && e.keyCode === 82) {
                this._replay();
                }
      }.bind(this);}, 
    _log: [],
    _logSetState: function(newState) {    // remember the old state in a clone
        this._log.push(JSON.parse(JSON.stringify(      
            this._log.length === 0 ? this.state : newState
                )
            )
        );    
        this.setState(newState);
    },
    _download: function(format, ev) {
      var contents = format === 'json' ? JSON.stringify(this.state.data) : this.state.data.reduce(function(result, row) {
                    return result + row.reduce(function(rowresult, cell, idx) {
                        return rowresult     + '"'   + cell.replace(/"/g, '""') + '"' + (idx < row.length - 1 ? ',' : '');            
                    }, '')          + "\n";      }, '');
  var URL = window.URL || window.webkitURL;  var blob = new Blob([contents], {type: 'text/' + format});  ev.target.href = URL.createObjectURL(blob);  ev.target.download = 'data.' + format;
 },

    _replay: function() {
      if (this._log.length === 0) {
          console.warn('No state to replay yet');
              return;
            }
        var idx = -1;
        var interval = setInterval(function() {
            idx++;
            if (idx === this._log.length - 1) {
              clearInterval(interval);
              }    
              this.setState(this._log[idx]);  }.bind(this), 1000); 
    }, 
    _sort: function(e){
        var column = e.target.cellIndex;
        var descending = this.state.sortby === column && !this.state.descending;
        var data = this.state.data.slice();
        data.sort(function(a,b){
             if(descending){return a[column]<b[column]?1:-1}
             else{return a[column]>b[column]?1:-1}
        });
        this._logSetState({data:data,sortby:column,descending:descending})
    },
    _showEditor: function(e){
        this._logSetState({
            edit: {row: parseInt(e.target.dataset.row,10),cell:e.target.cellIndex}
        })
    },
    _save(e){
        e.preventDefault();
        var input = e.target.firstChild;
        var data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this._logSetState({edit:null,data:data})
    },
    _preSearchData: null,
    render: function(){
        return (
            React.createElement('div',null,this._renderToolbar(),this._renderTable())
        )
    },

    _renderSearch(){
        if(this.state.search){
            return (
                React.DOM.tr({onChange:this._search},
                this.props.headers.map(function(_ignore,idx){
                    return React.DOM.td(null,
                    React.DOM.input({type:'text','data-idx':idx}))
                })
                )
            )
        }
        else{
            return null
        }
    },
    _toogle(){
        if(this.state.search){
            this._logSetState({
                data: this.preSearchData,
                search: false
            });
            this._preSearchData = null;
        }
        else{
            this._preSearchData = this.state.data;
            this._logSetState({search: true})
        }
    },
    _search(e){
        var needle = e.target.value.toLowerCase();
        if(!needle){
            this._logSetState({data: this._preSearchData});
            return;
        }
        var idx = e.target.dataset.idx;
        var searchdata = this._preSearchData.filter(function(row) {
              return row[idx].toString().toLowerCase().indexOf(needle) > -1; }); 
              this._logSetState({data: searchdata});
    },
    _renderToolbar(){
        return (
            React.DOM.div(null,
                React.DOM.button({onClick:this._toogle,className:'button'},"Search"),
                  React.DOM.a({onClick: this._download.bind(this, 'json'),href: 'data.json',className:'button'}, 'Export JSON'),
                  React.DOM.a({onClick: this._download.bind(this, 'csv'), href: 'data.csv',className:'button'  }, 'Export CSV') 
            )
        )
    },
    _renderTable: function(){
        return( 
            React.DOM.table(null,
                React.DOM.thead({onClick:this._sort},
                    React.DOM.tr(null,
                    this.state.headers.map(function(title,idx){
                        if(this.state.sortby === idx){title += this.state.descending?' \u2191' : ' \u2193'}
                        return React.DOM.th({key:idx},title)
                    },this))),
                React.createElement('tbody',{onDoubleClick:this._showEditor},
                this._renderSearch(),
                this.state.data.map(function(row,rowidx){
                    return React.createElement('tr',null,row.map(function(cell,idx){
                        var content = cell;
                        var edit = this.state.edit;
                        if(edit && edit.row === rowidx && edit.cell === idx){
                            content = React.createElement('form',{onSubmit:this._save},
                            React.DOM.input({Type:'text',defaultValue: content}))
                        }
                        return React.createElement('td',{'data-row':rowidx},content)
                    },this))
                },this))
            )
        )
    }
});
ReactDOM.render(React.createElement(Excel,{headers:headers,initialData:data}),target)