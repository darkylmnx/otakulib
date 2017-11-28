import React, { Component } from 'react';

class App extends Component {
  label = {
    'anime': 'épisodes',
    'film': 'films',
    'manga': 'tomes'
  }

  incSeen(serie) {
    if (serie.seen >= serie.total) {
      serie.seen = serie.total;
    } else {
      serie.seen++;
    }

    this.props.onSeriesChanged();
  }

  incTotal(serie) {
    serie.total++;
    this.props.onSeriesChanged();
  }

  decSeen(serie) {
    if (serie.seen <= 0) {
      serie.seen = 0;
    } else {
      serie.seen--;
    }

    this.props.onSeriesChanged();
  }

  decTotal(serie) {
    if (serie.total <= 0) {
      serie.total = 0;
    } else {
      serie.total--;
      serie.seen = Math.min(serie.seen, serie.total);
    }
    
    this.props.onSeriesChanged();
  }

  render() {
    return (
      <section className="column">
      { this.props.series.length === 0 && (
        <p className="notification is-info">
          Vous n'avez ajouté aucune série encore
        </p>
      )}

      { this.props.series.map((serie, index) => {
        return (
          <div className="card" key={ serie.name + serie.totla }>
            <header className="card-header">
              <h2 className="card-header-title">
                <span className="tag is-light">{ serie.type }</span> { serie.name }
              </h2>
            </header>
            <div className="card-content">
              <div className="content">
                <p>
                  { serie.seen === 0 && (
                    <span className="tag is-warning">
                      Pas commencé
                    </span>
                  )}

                  { serie.seen > 0 && serie.seen < serie.total && (
                    <span className="tag is-success">
                      En cours
                    </span>
                  )}

                  { serie.seen >= serie.total && (
                    <span className="tag is-black">
                      Fini
                    </span>
                  )}
                </p>

                <p>
                  <strong>nombre de { this.label[serie.type] } vus</strong> : 
                  { ' ' + serie.seen + ' ' }
                  <button className="button is-dark is-small"
                    onClick={ this.incSeen.bind(this, serie) }> + </button>
                  {' '}
                  <button className="button is-dark is-small"
                    onClick={ this.decSeen.bind(this, serie) }> - </button>
                </p>

                <p>
                  <strong>nombre de { this.label[serie.type] } total</strong> : 
                  { ' ' + serie.total + ' ' }
                  <button className="button is-dark is-small"
                    onClick={ this.incTotal.bind(this, serie) }> + </button>
                  {' '}
                  <button className="button is-dark is-small"
                    onClick={ this.decTotal.bind(this, serie) }> - </button>
                </p>
              </div>
            </div>
            <footer className="card-footer">
              <a className="card-footer-item"
                onClick={ this.props.onEditSerie.bind(this, serie) }>
                Editer
              </a>
              <a className="card-footer-item"
                onClick={ this.props.onDeleteSerie.bind(this, index) }>
                Supprimer
              </a>
            </footer>
          </div>
        )
      }) }
      </section>
    );
  }
}

export default App;
