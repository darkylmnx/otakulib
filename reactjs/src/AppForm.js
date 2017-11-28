import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)

    this.handleInput = this.handleInput.bind(this)
    this.addSerie = this.addSerie.bind(this)

    this.state = {
      new_type: 'anime',
      new_total: '',
      new_seen: '',
      new_name: '',
      error: false,
      message: ''
    }
  }

  componentWillReceiveProps(props) {
    if (!props.serie) {
      return;
    }

    this.setState({
      new_type: props.serie.type,
      new_total: props.serie.total,
      new_seen: props.serie.seen,
      new_name: props.serie.name
    });
  }

  handleInput(e) {
    var target = e.target;

    this.setState({
      [target.name]: target.value
    });
  }

  addSerie(e) {
    e.preventDefault();

    var new_name = this.state.new_name.trim();
    var new_type = this.state.new_type.trim();
    var new_seen = Number(this.state.new_seen);
    var new_total = Number(this.state.new_total);

    if (
      new_name === '' ||
      new_type === '' ||
      isNaN(new_total) ||
      isNaN(new_seen)
    ) {
      return this.setState({
        error: true,
        message: 'Tous les champs doivent être remplis'
      });
    } else if (new_seen > new_total) {
      return this.setState({
        error: true,
        message: 'Le nombre total doit doit être plus grand que le nombre vu'
      });
    }

    if (this.props.serie) {
      this.props.serie.name = new_name;
      this.props.serie.type = new_type;
      this.props.serie.total = new_total;
      this.props.serie.seen = new_seen;
      this.props.onSaveSerie();
    } else {
      var serie = {
        name: new_name,
        type: new_type,
        total: new_total,
        seen: new_seen
      };

      this.props.onSaveSerie(serie);
    }

    this.setState({
      new_type: 'anime',
      new_total: '',
      new_seen: '',
      new_name: '',
      error: false,
      message: ''
    });
  }

  render() {
    return (
      <div className="column is-one-third">
        <form id="form" className="panel" onSubmit={ this.addSerie }>
          <h2 className="panel-heading">Formulaire série</h2>

          <div className="panel-block" style={ {display: this.state.error ? '': 'none'} }>
            <p className="notification is-danger">{ this.state.message }</p>
          </div>

          <div className="panel-block">
            <div className="field">
              <label className="label">Nom</label>
              <p className="control">
                <input className="input" type="text" 
                  value={ this.state.new_name }
                  onChange={ this.handleInput }
                  name="new_name" />
              </p>
            </div>
          </div>

          <div className="panel-block">
            <div className="field">
              <label className="label">Type</label>
              <p className="control select">
                <select 
                  value={ this.state.new_type }
                  onChange={ this.handleInput }
                  name="new_type">
                  <option value="anime">Anime</option>
                  <option value="film">Film</option>
                  <option value="manga">Manga</option>
                </select>
              </p>
            </div>
          </div>

          <div className="panel-block">
            <div className="field">
              <label className="label">Total</label>
              <p className="help">(nombre de tomes, épisodes, films)</p>
              <p className="control">
                <input className="input" type="number" 
                  value={ this.state.new_total }
                  onChange={ this.handleInput }
                  name="new_total" />
              </p>
            </div>
          </div>

          <div className="panel-block">
            <div className="field">
              <label className="label">Vu</label>
              <p className="help">(nombre de tomes, épisodes, films)</p>
              <p className="control">
                <input className="input" type="number" 
                  value={ this.state.new_seen }
                  onChange={ this.handleInput }
                  name="new_seen" />
              </p>
            </div>
          </div>

          <div className="panel-block" style={ {display: this.state.error ? '': 'none'} }>
            <p className="notification is-danger">{ this.state.message }</p>
          </div>

          <div className="panel-block">
            <button className="button is-success is-block" type="submit">
              envoyer
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
