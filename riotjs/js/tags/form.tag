<app-form>
    <form id="form" class="panel" onsubmit={ addSerie }>
        <h2 class="panel-heading">Formulaire série</h2>

        <div class="panel-block" show={ error }>
            <p class="notification is-danger">{ message }</p>
        </div>

        <div class="panel-block">
            <div class="field">
                <label class="label">Nom</label>
                <p class="control">
                    <input class="input" type="text" ref="new_name">
                </p>
            </div>
        </div>

        <div class="panel-block">
            <div class="field">
                <label class="label">Type</label>
                <p class="control select">
                    <select ref="new_type">
                        <option value="anime">Anime</option>
                        <option value="film">Film</option>
                        <option value="manga">Manga</option>
                    </select>
                </p>
            </div>
        </div>

        <div class="panel-block">
            <div class="field">
                <label class="label">Total</label>
                <p class="help">(nombre de tomes, épisodes, films)</p>
                <p class="control">
                    <input class="input" type="number" ref="new_total">
                </p>
            </div>
        </div>

        <div class="panel-block">
            <div class="field">
                <label class="label">Vu</label>
                <p class="help">(nombre de tomes, épisodes, films)</p>
                <p class="control">
                    <input class="input" type="number" ref="new_seen">
                </p>
            </div>
        </div>

        <div class="panel-block" show={ error }>
            <p class="notification is-danger">{ message }</p>
        </div>

        <div class="panel-block">
            <button class="button is-success is-block" type="submit">
                envoyer
            </button>
        </div>
    </form>

    <script>
        this.on('mount', this.resetForm);
        window.SeriesEventBus.on('edit', edit.bind(this));

        function edit(serie) {
            this.edited_serie = serie;
            this.refs.new_name.value = serie.name;
            this.refs.new_type.value = serie.type;
            this.refs.new_total.value = serie.total;
            this.refs.new_seen.value = serie.seen;
        }

        addSerie(e) {
            e.preventDefault();

            var new_name = this.refs.new_name.value.trim();
            var new_type = this.refs.new_type.value.trim();
            var new_seen = parseInt(this.refs.new_seen.value);
            var new_total = parseInt(this.refs.new_total.value);

            if (
                new_name === '' ||
                new_type === '' ||
                isNaN(new_total) ||
                isNaN(new_seen)
            ) {
                this.error = true;
                this.message = 'Tous les champs doivent être remplis';
                return;
            } else if (new_seen > new_total) {
                this.error = true;
                this.message = 'Le nombre total doit doit être plus grand que le nombre vu';
                return;
            }

            if (this.edited_serie) {
                this.edited_serie.name = new_name;
                this.edited_serie.type = new_type;
                this.edited_serie.total = new_total;
                this.edited_serie.seen = new_seen;

                window.SeriesEventBus.trigger('updated');
            } else {
                var serie = {
                    name: new_name,
                    type: new_type,
                    total: new_total,
                    seen: new_seen
                };

                window.SeriesEventBus.trigger('added', serie);
            }

            this.resetForm();
        }

        resetForm() {
            this.error = false;
            this.message = '';
            this.edited_serie = '';
            this.refs.new_name.value = '';
            this.refs.new_type.value = 'anime';
            this.refs.new_total.value = '';
            this.refs.new_seen.value = '';
        }
    </script>
</app-form>
