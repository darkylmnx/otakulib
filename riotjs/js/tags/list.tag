<app-list>
    <section>
        <p class="notification is-info" if={ series.length == 0 }>
            Vous n'avez ajouté aucune série encore
        </p>

        <div class="card" each={ serie, i in series }>
            <header class="card-header">
                <h2 class="card-header-title">
                    <span class="tag is-light">{ serie.type }</span> { serie.name }
                </h2>
            </header>
            <div class="card-content">
                <div class="content">
                    <p>
                        <span class="tag is-warning" if={ serie.seen == 0 }>
                            Pas commencé
                        </span>
                        <span class="tag is-success" if={ serie.seen > 0 && serie.seen < serie.total }>
                            En cours
                        </span>
                        <span class="tag is-black" if={ serie.seen >= serie.total }>
                            Fini
                        </span>
                    </p>

                    <p>
                        <strong>nombre de { parent.label[serie.type] } vus</strong> : 
                        { serie.seen }
                        <button class="button is-dark is-small" onclick={ parent.incSeen }> + </button>
                        <button class="button is-dark is-small" onclick={ parent.decSeen }> - </button>
                    </p>

                    <p>
                        <strong>nombre de { parent.label[serie.type] } total</strong> : 
                        { serie.total }
                        <button class="button is-dark is-small" onclick={ parent.incTotal }> + </button>
                        <button class="button is-dark is-small" onclick={ parent.decTotal }> - </button>
                    </p>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" onclick={ parent.editSerie }>
                    Editer
                </a>
                <a class="card-footer-item" onclick={ parent.deleteSerie }>
                    Supprimer
                </a>
            </footer>
        </div>
    </section>

    <script>
        this.series = window.getLocalJson('series');
        this.saveSeries = saveSeries.bind(this);
        this.label = {
            'anime': 'épisodes',
            'film': 'films',
            'manga': 'tomes'
        };

        window.SeriesEventBus.on('added', serieAdded.bind(this));
        window.SeriesEventBus.on('updated', serieUpdated.bind(this));

        function saveSeries() {
            window.setLocalJson('series', this.series);
        }

        function serieAdded(serie) {
            this.series.unshift(serie);
            this.update();
            this.saveSeries();
        }

        function serieUpdated() {
            this.update();
            this.saveSeries();
        }

        deleteSerie(event) {
            this.series.splice(event.item.i, 1);
            this.saveSeries();
        }

        editSerie(event) {
            var serie = event.item.serie;

            window.scroll(0, 0);
            window.SeriesEventBus.trigger('edit', serie);
        }

        incSeen(event) {
            var serie = event.item.serie;

            if (serie.seen >= serie.total) {
                serie.seen = serie.total;
                return;
            }

            serie.seen++;
            this.saveSeries();
        }

        incTotal(event) {
            var serie = event.item.serie;

            serie.total++;
            this.saveSeries();
        }

        decSeen(event) {
            var serie = event.item.serie;

            if (serie.seen <= 0) {
                serie.seen = 0;
                return;
            }

            serie.seen--;
            this.saveSeries();
        }

        decTotal(event) {
            var serie = event.item.serie;

            if (serie.total <= 0) {
                serie.total = 0;
                return;
            }

            serie.total--;
            serie.seen = Math.min(serie.seen, serie.total);
            this.saveSeries();
        }
    </script>
</app-list>
