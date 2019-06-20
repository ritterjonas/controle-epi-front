function Epi(data) {
    var self = this;

    self.id = ko.observable(data.idEpi);
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
        data.isEditing(true);
        setTimeout(function () {
            $('select').formSelect();
        }, 0);
    }

    self.remove = function (data) {
        var epi = {id: data.id(), nome: data.name(), tipo: data.type()};
        $.ajax({
            url: "http://localhost:8081/api/epis/"+data.id(),
            type: "DELETE",
            data: JSON.stringify(epi),
            contentType:"application/json",
            success: function (response) {
                self.list.remove(data);
            },
            error: function (xhr, status) {
                alert("Erro ao deletar EPI");
            }
        });
    }

    self.save = function (data) {
        ko.utils.arrayForEach(self.list(), function (item) {            
            item.isEditing(false);
            if (!item.name())
                self.list.remove(item);
        });
        
        var epi = {nome: data.name(), tipo: data.type()};

        if(!data.id()){
            $.ajax({
                url: "http://localhost:8081/api/epis/",
                type: "POST",
                data: JSON.stringify(epi),
                contentType:"application/json",
                success: function (response) {
                    self.list()[self.list().length-1].id(response.idEpi);
                },
                error: function (xhr, status) {
                    alert("Erro ao inserir EPI");
                }
            });
        } else{
            $.ajax({
                url: "http://localhost:8081/api/epis/"+data.id(),
                type: "PUT",
                data: JSON.stringify(epi),
                contentType:"application/json",
                success: function (response) {
                    
                },
                error: function (xhr, status) {
                    alert("Erro ao editar EPI");
                }
            });
        }
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