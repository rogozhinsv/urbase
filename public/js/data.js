var DataPage = (function() {
    var _nextCompaniesUrl = "",
        _prevCompaniesUrl = "";
    var _haveBeenSendRequestToApi = false;

    function init(nextCompaniesUrl, prevCompaniesUrl) {
        _nextCompaniesUrl = nextCompaniesUrl.replace(/&amp;/g, "&");
        _prevCompaniesUrl = prevCompaniesUrl.replace(/&amp;/g, "&");

        $(document).ready(function() {
            $("table.table.cart").bind("infinite-scroll", loadNextPortionData);
            var infiniteScroll = new $.InfiniteScroll("table.table.cart", true).setup();

            $("#ulDataPageOkved input[type='checkbox']").change(okvedChanged);
            $("#ulDataPageRegions input[type='checkbox']").change(regionChanged);
            $("#ulDataPageFilterContacts input[type='checkbox']").change(contactsFilterChanged);
        });
    }

    function regionChanged(event) {
        updateData();
    }

    function okvedChanged(event) {
        updateData();
    }

    function contactsFilterChanged(event) {
        updateData();
    }

    function updateData() {
        var url = getWcfApiHost() + "/companies?limit=20&offset=0";

        var selectedRegions = getSelectedRegions();
        var selectedOkveds = getSelectedOkveds();
        var allOkveds = getAllOkveds();

        if (selectedOkveds.length == 0 && selectedRegions.length == 0) {
            url = _prevCompaniesUrl;
        } else {
            if (selectedRegions.length > 0) {
                url += "&region__in=" + selectedRegions.join(",");
            }
            if (selectedOkveds.length > 0) {
                url += "&okved__in=" + selectedOkveds.join(",");
            } else if (getParameterByName("query") && allOkveds.length > 0) {
                url += "&okved__in=" + allOkveds.join(",");
            }
        }

        if (showWithPhone()) {
            url += "&has_phone=1";
        }
        if (showWithEmail()) {
            url += "&has_email=1";
        }

        $.ajax({
            method: "GET",
            url: url,
            async: true,
            type: "application/json",
            success: updateData_Success
        });
    }

    function showWithPhone() {
        return $("#ulDataPageFilterContacts input[type='checkbox'][id='cbxCompanyWithPhone']:checked").length > 0;
    }

    function showWithEmail() {
        return $("#ulDataPageFilterContacts input[type='checkbox'][id='cbxCompanyWithEmail']:checked").length > 0;
    }

    function updateData_Success(data) {
        $("table.table.cart tr.cart-item").remove();
        $(".table-responsive-results-count").text(data.count);

        appendCompanies(data);
    }

    function getSelectedRegions() {
        return $("#ulDataPageRegions input[type='checkbox']:checked").map(function() { return $(this).val() }).toArray();
    }

    function getSelectedOkveds() {
        return $("#ulDataPageOkved input[type='checkbox']:checked").map(function() { return $(this).val() }).toArray();
    }

    function getAllOkveds() {
        return $("#ulDataPageOkved input[type='checkbox']").map(function() { return $(this).val() }).toArray();
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
        _nextCompaniesUrl = data.next ? decodeURIComponent(data.next) : null;

        var html = "";
        for (var i = 0; i < data.results.length; i++) {
            var item = data.results[i];
            var linkToCompany = "<a target='_blank' href='/company/" + item.id + "'>" + item.name + "</a>";

            html += "<tr class='cart-item'><td>" + linkToCompany + "</td><td>" + item.area + "</td><td>" + item.region +
                "</td><td>" + item.head + "</td><td>" + item.phone + "</td><td>" + item.email + "</td></tr>";
        }
        $("table.table.cart tr:last").after(html);

        _haveBeenSendRequestToApi = false;
    }

    return {
        init: init
    };
})();