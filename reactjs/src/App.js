import React, { Component } from 'react';
import AppForm from './AppForm';
import AppList from './AppList';
import { getLocalJson, setLocalJson } from './utils';
import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.saveSeries = this.saveSeries.bind(this)
    this.saveSerie = this.saveSerie.bind(this)
    this.editSerie = this.editSerie.bind(this)
    this.deleteSerie = this.deleteSerie.bind(this)

    this.state = {
      series: getLocalJson('series'),
      edited_serie: null
    };
  }

  saveSeries() {
    setLocalJson('series', this.state.series);

    this.setState({
      series: getLocalJson('series')
    });
  }

  saveSerie(serie) {
    if (serie) {
      this.state.series.unshift(serie);
    }

    this.setState({
      edited_serie: null
    });

    this.saveSeries();

    window.scroll(0, 0);
  }

  editSerie(serie) {
    this.setState({
      edited_serie: serie
    });

    window.scroll(0, 0);
  }

  deleteSerie(i) {
    this.state.series.splice(i, 1);
    this.saveSeries();
  }

  render() {
    return (
      <div className="columns">
        <AppList series={ this.state.series }
          onSeriesChanged={ this.saveSeries }
          onEditSerie={ this.editSerie }
          onDeleteSerie={ this.deleteSerie } />
        <AppForm serie={ this.state.edited_serie }
          onSaveSerie={ this.saveSerie } />
      </div>
    );
  }
}

export default App;
