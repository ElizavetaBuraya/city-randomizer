import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      canGenerate: true,
      generatedList: [],
      history: [],
      textAreaHeight : 1,
    };
    this.generatedListLength = 0;
    this.loadData = this.loadData.bind(this);
    this.handleGenerateClick = this.handleGenerateClick.bind(this);
  }

  componentDidMount() {
      this.loadData();
  }

  loadData() {
    const url = 'https://gp-js-test.herokuapp.com/api';
    fetch(url)
        .then((response) => {
            return response.json()})
        .then((json) => {
            let generatedPairsList = [];

            json.adjectives.forEach((adjective) => {
                json.cities.forEach((city) => generatedPairsList.push(adjective + " " + city))
            });

            this.generatedListLength = generatedPairsList.length;
            this.setState({
                generatedList: generatedPairsList
            });
        });
  }

  handleGenerateClick() {
    let generatedPairs = this.state.generatedList;
    let generatedHistory = this.state.history;
    let randomPosition = Math.floor(Math.random() * generatedPairs.length);
    let randomPair = generatedPairs[randomPosition].charAt(0).toUpperCase() + generatedPairs[randomPosition].slice(1);

    this.textInput.value = randomPair;
    generatedHistory.push(randomPair);
    generatedPairs.splice(randomPosition, 1);

    this.setState ({
      generatedList: generatedPairs,
      history: generatedHistory
    });

    this.autoGrow();

    if (this.state.generatedList.length === 0) {
      this.setState ({
        canGenerate: false
      });
    }
  }

  autoGrow() {
    let textHeight = this.state.textAreaHeight + 1;

    this.setState({
      textAreaHeight: textHeight
    });
  }

  render() {
    const history = this.state.history;
    let generatedHistory = (history.length !== 0)
                           ? history.join().replace(/,/g,'\n')
                           : null;

    return (
      <div className="App">
        <div className="App-header">
          <h2>City randomizer</h2>
        </div>
        <p className="App-content">
          <div className="button-block">
            <button disabled={!this.state.canGenerate}
                    onClick={this.handleGenerateClick}>Generate
            </button>
          </div>
          <span>Generated pair:</span>
          <input type="text"
                 ref={(input) => {this.textInput = input;}} /><br/>
          <textarea value = {(generatedHistory) ? generatedHistory : ""}
                    cols="38"
                    rows={this.state.textAreaHeight} /><br />
          <span>Generated {history.length} out of {this.generatedListLength}</span>
        </p>
      </div>
    );
  }
}

export default App;
