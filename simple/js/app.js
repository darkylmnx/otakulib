var app = new Vue({
    el: '#main',

    data: {
        series: []
    },

    created() {
        this.series = getLocalJson('series');
    }
})

function getLocalJson(key) {
    var data = localStorage.getItem(key);

    if (data) {
        data = JSON.parse(data);
    } else {
        data = [];
    }

    return data;
}
