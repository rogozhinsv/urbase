(function() {
    var _wcfApiHost = "http://89.223.88.59/api";

    $(document).ready(function() {
        init();
    });

    function init() {
        $('#tbxOkvedMainSearch').typeahead({
            ajax: {
                url: _wcfApiHost + "/okved",
                timeout: 500,
                displayField: "title",
                triggerLength: 1,
                method: "get",                
                preDispatch: function(c) {
                    return "limit=15&title=" + c;
                },
                preProcess: function(data) {
                    return data.results;
                }
            },
            autoSelect: false,
            onSelect: function(data) {
                window.location.href = "/data?okved=" + data.value;
            }
        });

        $("#btnOkvedMainSearch").click(onBtnOkvedMainSearch_Clicked);

        $('#tbxOkvedExtraSearch').typeahead({
            ajax: {
                url: _wcfApiHost + "/okved",
                timeout: 500,
                displayField: "title",
                triggerLength: 1,
                method: "get",                
                preDispatch: function(c) {
                    return "limit=15&title=" + c;
                },
                preProcess: function(data) {
                    return data.results;
                }
            },
            autoSelect: false,
            onSelect: function(data) {
                window.location.href = "/data?okved=" + data.value;
            }
        });

        $("#btnOkvedExtraSearch").click(onBtnOkvedExtraSearch_Clicked);
    }

    function onBtnOkvedMainSearch_Clicked(event) {
        window.location.href = "/data?query=" + $('#tbxOkvedMainSearch').val();
    }

    function onBtnOkvedExtraSearch_Clicked(event) {
        window.location.href = "/data?query=" + $('#tbxOkvedExtraSearch').val();
    }
})();