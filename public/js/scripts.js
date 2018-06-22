(function() {
    $(document).ready(function() {
        init();
    });

    function init() {
        $('#tbxActivityField').typeahead({
            ajax: {
                url: "http://89.223.88.59/api/okved",
                timeout: 500,
                displayField: "title",
                triggerLength: 1,
                method: "get",
                preDispatch: function(c) {
                    return "limit=10&title=" + c;
                },
                preProcess: function(data) {
                    return data.results;
                }
            },
            onSelect: function(data) {
                window.location.href = "/data?okved=" + data.value;
            }
        });

        $("#btnSearch").click(function() {
            window.location.href = "/data?query=" + $('#tbxActivityField').val();
        });
    }
})();