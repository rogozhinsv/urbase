var DataPage = (function() {
    var _nextCompaniesUrl = "";

    function init(nextCompaniesUrl) {
        _nextCompaniesUrl = nextCompaniesUrl.replace("&amp;", "&");

        $(document).ready(function() {
            $("table.table.cart").bind("infinite-scroll", loadNextPortionData);
            var infiniteScroll = new $.InfiniteScroll("table.table.cart", true).setup();
        });
    }

    function loadNextPortionData() {
        if (_nextCompaniesUrl) {
            $.ajax({
                method: "GET",
                url: _nextCompaniesUrl,
                async: true,
                type: "application/json",
                success: appendCompanies
            });
        }
    }

    function appendCompanies(data) {

    }

    return {
        init: init
    };
})();