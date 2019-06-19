function Funcionario(data) {
    var self = this;

    self.name = ko.observable(data.name);
    self.street = ko.observable(data.street);
    self.number = ko.observable(data.number);
    self.city = ko.observable(data.city);
    self.state = ko.observable(data.state);
    self.country = ko.observable(data.country);
    self.cep = ko.observable(data.cep);
    self.cpf = ko.observable(data.cpf);
    self.email = ko.observable(data.email);
    self.job = ko.observable(data.job);
    self.admin = ko.observable(data.admin);
    self.date = ko.observable(data.date);

    self.isEditing = ko.observable(!!data.new);
}

function ViewModel() {
    var self = this;

    self.tabActive = ko.observable(1);
    self.setActiveTab = function (index) {
        self.tabActive(index);
    }

    self.list = ko.observableArray(ko.utils.arrayMap(api.getFuncionarios(), function (item) {
        return new Funcionario(item);
    }));

    self.addNew = function () {
        self.list.push(new Funcionario({new : true}));
        setTimeout(function () {
            $('.datepicker').datepicker({format: 'yyyy-mm-dd'})
            $('select').formSelect();
        }, 0);
    }

    self.edit = function (data) {
        self.save();
        data.isEditing(true);
        setTimeout(function () {
            $('.datepicker').datepicker({format: 'yyyy-mm-dd'})
            $('select').formSelect();
        }, 0);
    }

    self.remove = function (data) {
        self.list.remove(data);
        self.save();
    }

    self.save = function () {
        ko.utils.arrayForEach(self.list(), function (item) {
            item.isEditing(false);
            if (!item.name())
                self.list.remove(item);
        });
        api.setFuncionarios(ko.toJS(self.list()));
    }

    self.listAreas = ko.observableArray(api.getSetores());
}

var viewModel = new ViewModel();

$(function () {
    ko.applyBindings(viewModel);
});