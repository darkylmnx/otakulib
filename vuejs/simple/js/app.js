var app = new Vue({
    el: '#main',

    data: {
        series: [],
        label: {
            'anime': 'épisodes',
            'film': 'films',
            'manga': 'tomes'
        },
        error: false,
        edited_serie: '',
        message: '',
        new_name: '',
        new_type: 'anime',
        new_total: '',
        new_seen: ''
    },

    created() {
        this.series = getLocalJson('series');
    },

    methods: {
        addSerie: function() {
            this.new_seen = parseInt(this.new_seen);
            this.new_total = parseInt(this.new_total);

            if (
                this.new_name === '' ||
                this.new_type === '' ||
                this.new_total === '' ||
                this.new_seen === ''
            ) {
                this.error = true;
                this.message = 'Tous les champs doivent être remplis';
                return;
            }

            else if (this.new_seen > this.new_total) {
                this.error = true;
                this.message = 'Le nombre total doit doit être plus grand que le nombre vu';
                return;
            } 

            if (this.edited_serie) {
                this.edited_serie.name = this.new_name;
                this.edited_serie.type = this.new_type;
                this.edited_serie.total = this.new_total;
                this.edited_serie.seen = this.new_seen;
            } else {
                var serie = {
                    name: this.new_name,
                    type: this.new_type,
                    total: this.new_total,
                    seen: this.new_seen
                };

                this.series.unshift(serie);
            }

            this.resetForm();
            setLocalJson('series', this.series);
        },

        resetForm: function() {
            this.error = false;
            this.message = '';
            this.edited_serie = '';
            this.new_name = '';
            this.new_type = 'anime';
            this.new_total = '';
            this.new_seen = '';
        },

        deleteSerie: function(index) {
            this.series.splice(index, 1);
            setLocalJson('series', this.series);
        },

        editSerie: function(serie) {
            window.scroll(0, 0);
            this.edited_serie = serie
            this.new_name = serie.name;
            this.new_type = serie.type;
            this.new_total = serie.total;
            this.new_seen = serie.seen;
        },

        incSeen: function(serie) {
            if (serie.seen >= serie.total) {
                serie.seen = serie.total;
                return;
            }

            serie.seen++;
            setLocalJson('series', this.series);
        },
        incTotal: function(serie) {
            serie.total++;
            setLocalJson('series', this.series);
        },
        decSeen: function(serie) {
            if (serie.seen <= 0) {
                serie.seen = 0;
                return;
            }

            serie.seen--;
            setLocalJson('series', this.series);
        },
        decTotal: function(serie) {
            if (serie.total <= 0) {
                serie.total = 0;
                return;
            }

            serie.total--;
            serie.seen = Math.min(serie.seen, serie.total);
            setLocalJson('series', this.series);
        }
    }
});

function getLocalJson(key) {
    var data = localStorage.getItem(key);

    if (data) {
        data = JSON.parse(data);
    } else {
        data = [];
    }

    return data;
}

function setLocalJson(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}
