function ViewModel() {
    var self = this;

    self.list = ko.observableArray();

    self.getEpis = function (epis) {
        return ko.utils.arrayMap(epis, function (item) {
            return item.epi.nome;
        }).join(', ');
    }

    self.regulares = ko.computed(function () {
        return ko.utils.arrayFilter(self.list(), function (item) {
            return item.status;
        }).length;
    });

    self.irregulares = ko.computed(function () {
        return ko.utils.arrayFilter(self.list(), function (item) {
            return !item.status;
        }).length;
    });

    self.getData = function () {
        $.ajax({
            url: "http://localhost:8081/api/historico/",
            type: "GET",
            success: function (response) {
                self.list(response);
            },
            error: function (xhr, status) {
                alert("Erro ao carregar dados");
            }
        });
    }
}

var viewModel = new ViewModel();
viewModel.getData();

$(function () {
    ko.applyBindings(viewModel);
});