import React, { Component } from 'react';
import '../styles/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.generatedListLength = 0;
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
            this.props.generatePairsList(generatedPairsList);
        });
  }

  handleGenerateClick() {
    let generatedPairs = this.props.state.renderApp.pairs;
    let generatedHistory = this.props.state.renderApp.history;
    let randomPosition = Math.floor(Math.random() * generatedPairs.length);
    let randomPair = generatedPairs[randomPosition].charAt(0).toUpperCase() + generatedPairs[randomPosition].slice(1);

    this.textInput.value = randomPair;
    generatedHistory.push(randomPair);
    generatedPairs.splice(randomPosition, 1);

    this.props.generatePairsList(generatedPairs);
    this.props.renderHistory(generatedHistory);

    this.autoGrow();

    if (generatedPairs.length === 0) {
      this.props.toggleGenerate(false);
    }
  }

  autoGrow() {
    let textHeight = this.props.state.renderApp.height + 1;

    this.props.setTextAreaHeight(textHeight);
  }

  render() {
    const history = this.props.state.renderApp.history;
    const canGenerate = this.props.state.renderApp.canGenerate;
    const textAreaHeight = this.props.state.renderApp.height;

    let generatedHistory = (history.length !== 0)
                           ? history.join().replace(/,/g,'\n')
                           : null;

    return (
      <div className="App">
        <div className="App-header">
          <h2>City randomizer</h2>
        </div>
        <div className="App-content">
          <div className="button-block">
            <button disabled={!canGenerate}
                    onClick={this.handleGenerateClick}>Generate
            </button>
          </div>
          <span>Generated pair:</span>
          <input type="text"
                 ref={(input) => {this.textInput = input;}} /><br/>
          <textarea value = {(generatedHistory) ? generatedHistory : ""}
                    cols="38"
                    rows={textAreaHeight} /><br />
          <span>Generated {history.length} out of {this.generatedListLength}</span>
        </div>
      </div>
    );
  }
}
