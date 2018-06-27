var DataPage = (function() {
    var _nextCompaniesUrl = "";
    var _haveBeenSendRequestToApi = false;

    function init(nextCompaniesUrl) {
        _nextCompaniesUrl = nextCompaniesUrl.replace(/&amp;/g, "&");

        $(document).ready(function() {
            $("table.table.cart").bind("infinite-scroll", loadNextPortionData);
            var infiniteScroll = new $.InfiniteScroll("table.table.cart", true).setup();

            $("#ulDataPageOkved input[type='checkbox']").change(okvedChanged);
            $("#ulDataPageRegions input[type='checkbox']").change(regionChanged);
        });
    }

    function regionChanged(event) {
        var selectedRegions = getSelectedRegions();
    }

    function okvedChanged(event) {
        var selectedOkveds = getSelectedOkveds();
    }

    function getSelectedRegions() {
        return $("#ulDataPageRegions input[type='checkbox']:checked").map(function() { return $(this).val() });
    }

    function getSelectedOkveds() {
        return $("#ulDataPageRegions input[type='checkbox']:checked").map(function() { return $(this).val() });
    }

    function loadNextPortionData() {
        if (_nextCompaniesUrl && !_haveBeenSendRequestToApi) {
            _haveBeenSendRequestToApi = true;

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
        _nextCompaniesUrl = decodeURIComponent(data.next);

        var html = "";
        for (var i = 0; i < data.results.length; i++) {
            var item = data.results[i];
            var linkToCompany = "<a href='/company/" + item.id + "'>" + item.name + "</a>";

            html += "<tr class='cart-item'><td>" + linkToCompany + "</td><td>" + item.area + "</td><td>" + item.region +
                "</td><td>" + item.head + "</td><td>" + item.phone + "</td></tr>";
        }
        $("table.table.cart tr:last").after(html);

        _haveBeenSendRequestToApi = false;
    }

    return {
        init: init
    };
})();