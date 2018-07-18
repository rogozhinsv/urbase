var OkvedListPage = (function() {
    var _nextItemsUrl = "";
    var _haveBeenSendRequestToApi = false;

    function init(nextItemsUrl) {
        _nextItemsUrl = nextItemsUrl.replace(/&amp;/g, "&");

        $(document).ready(function() {
            $("table.table.cart").bind("infinite-scroll", loadNextPortionData);
            var infiniteScroll = new $.InfiniteScroll("table.table.cart", true).setup();

            $('#tbxOkvedFullSearch').typeahead({
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

            $('#tbxOkvedFullSearch').on("keyup", onTbxOkvedFullSearch_KeyUp);
            $("#btnOkvedFullSearch").click(onBtnOkvedFullSearch_Clicked);
        });
    }

    function onTbxOkvedFullSearch_KeyUp(event) {
        if (event.keyCode == 13) {
            window.location.href = "/codes-okved?query=" + $('#tbxOkvedFullSearch').val();
        }
    }

    function onBtnOkvedFullSearch_Clicked(event) {
        window.location.href = "/codes-okved?query=" + $('#tbxOkvedFullSearch').val();
    }

    function loadNextPortionData() {
        if (_nextItemsUrl && !_haveBeenSendRequestToApi) {
            _haveBeenSendRequestToApi = true;

            $.ajax({
                method: "GET",
                url: _nextItemsUrl,
                async: true,
                type: "application/json",
                success: appendItems
            });
        }
    }

    function appendItems(data) {
        _nextItemsUrl = data.next ? decodeURIComponent(data.next) : null;

        var html = "";
        var query = getParameterByName("query");
        for (var i = 0; i < data.results.length; i++) {
            var item = data.results[i];
            html += "<tr class='cart-item'><td>" + item.code + "</td><td>" + item.title + "</td></tr>";
        }
        $("table.table.cart tr:last").after(html);

        _haveBeenSendRequestToApi = false;
    }

    return {
        init: init
    };
})();