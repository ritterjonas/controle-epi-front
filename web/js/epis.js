function Epi(data) {
    var self = this;

    self.name = ko.observable(data.nome);
    self.type = ko.observable(data.tipo);

    self.isEditing = ko.observable(!!data.new);
}

function ViewModel() {
    var self = this;
    
    self.list = ko.observableArray();

    self.tabActive = ko.observable(1);
    self.setActiveTab = function (index) {
        self.tabActive(index);
    }

    self.addNew = function () {
        self.list.push(new Epi({new : true}));
        setTimeout(function () {
            $('select').formSelect();
        }, 0);
    }

    self.edit = function (data) {
        self.save();
        data.isEditing(true);
        setTimeout(function () {
            $('select').formSelect();
        }, 0);
    }

    self.remove = function (data) {
        self.list.remove(data);
        self.save();
    }

    self.save = function (data) {
        ko.utils.arrayForEach(self.list(), function (item) {            
            item.isEditing(false);
            if (!item.name())
                self.list.remove(item);
        });
        
        var epi = {nome: data.name(), tipo: data.type()};

        $.ajax({
            url: "http://localhost:8081/api/epis/",
            type: "POST",
            data: epi,
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function (response) {
                alert('boa campeao');
            },
            error: function (xhr, status) {
                alert("erro");
            }
        });
    }
    
    self.getData = function(){
        $.ajax({
            url: "http://localhost:8081/api/epis/",
            type: "GET",            
            success: function (response) {
                self.list(ko.utils.arrayMap(response, function (item) {
                    return new Epi(item);
                }));
            },
            error: function (xhr, status) {
                alert("erro");
            }
        });
    }
}

var viewModel = new ViewModel();
viewModel.getData();

$(function () {
    ko.applyBindings(viewModel);
});