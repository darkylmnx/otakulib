var app = new Vue({
    el: '#main',

    data: {
        series: [],
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
            var serie = {
                name: this.new_name,
                type: this.new_type,
                total: this.new_total,
                seen: this.new_seen
            };

            this.series.push(serie);
            this.resetForm();
        },

        resetForm: function() {
            this.new_name = '';
            this.new_type = 'anime';
            this.new_total = '';
            this.new_seen = '';
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
