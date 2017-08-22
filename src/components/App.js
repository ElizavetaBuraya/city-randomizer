import React, { Component } from 'react';
import Spinner from 'react-spinner-material';
import '../styles/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.maxLength = 10;
    this.handleGenerateClick = this.handleGenerateClick.bind(this);
  }

  componentDidMount() {
      this.props.fetchData();
  }

  handleGenerateClick() {
    let generatedPairs = this.props.pairs;
    let generatedHistory = this.props.history;
    let randomPosition = Math.floor(Math.random() * generatedPairs.length);
    let randomPair = generatedPairs[randomPosition].charAt(0).toUpperCase() + generatedPairs[randomPosition].slice(1);

    this.textInput.value = randomPair;
    generatedHistory.push(randomPair);

    this.props.renderHistory(generatedHistory);

    this.autoGrow();

    if (generatedHistory.length === this.maxLength) {
      this.props.toggleGenerate(false);
    }
  }

  autoGrow() {
    let textHeight = this.props.textAreaHeight + 1;

    this.props.setTextAreaHeight(textHeight);
  }

  render() {
    const history = this.props.history;
    const isFetching = this.props.isFetching;
    const canGenerate = this.props.canGenerate;
    const textAreaHeight = this.props.textAreaHeight;

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
            {isFetching &&
                <div className="App-content">
                    <Spinner
                        size={120}
                        spinnerColor={"#333"}
                        spinnerWidth={2}
                        visible={true} />
                </div>
            }
      </div>
    );
  }
}
