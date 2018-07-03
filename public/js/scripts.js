(function() {
    $(document).ready(function() {
        init();
    });

    function init() {
        $('#tbxOkvedMainSearch').typeahead({
            ajax: {
                url: getWcfApiHost() + "/okved",
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

        $('#tbxOkvedMainSearch').on("keyup", onTbxOkvedSearch_KeyUp);
        $("#btnOkvedMainSearch").click(onBtnOkvedMainSearch_Clicked);

        $('#tbxOkvedExtraSearch').typeahead({
            ajax: {
                url: getWcfApiHost() + "/okved",
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

        $('#tbxOkvedExtraSearch').on("keyup", onTbxOkvedExtraSearch_KeyUp);
        $("#btnOkvedExtraSearch").click(onBtnOkvedExtraSearch_Clicked);
    }

    function onTbxOkvedSearch_KeyUp(event) {
        if (event.keyCode == 13) {
            window.location.href = "/data?query=" + $('#tbxOkvedMainSearch').val();
        }
    }

    function onTbxOkvedExtraSearch_KeyUp(event) {
        if (event.keyCode == 13) {
            window.location.href = "/data?query=" + $('#tbxOkvedExtraSearch').val();
        }
    }

    function onBtnOkvedMainSearch_Clicked(event) {
        window.location.href = "/data?query=" + $('#tbxOkvedMainSearch').val();
    }

    function onBtnOkvedExtraSearch_Clicked(event) {
        window.location.href = "/data?query=" + $('#tbxOkvedExtraSearch').val();
    }
})();