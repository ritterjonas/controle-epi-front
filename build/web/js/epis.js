function Epi(data) {
    var self = this;

    self.id = ko.observable(data.idEpi);
    self.name = ko.observable(data.nome);
    self.type = ko.observable(data.tipo);

    self.isEditing = ko.observable(!!data.new);
    
    self.save = function () {
        ko.utils.arrayForEach(viewModel.list(), function (item) {            
            item.isEditing(false);
            if (!item.name())
                viewModel.list.remove(item);
        });
        
        if(!self.name() || !self.type()) return;
        
        var epi = {nome: self.name(), tipo: self.type()};

        if(!self.id()){
            $.ajax({
                url: "http://localhost:8081/api/epis/",
                type: "POST",
                data: JSON.stringify(epi),
                contentType:"application/json",
                success: function (response) {
                    self.id(response.idEpi);
                },
                error: function (xhr, status) {
                    alert("Erro ao inserir EPI");
                }
            });
        } else{
            $.ajax({
                url: "http://localhost:8081/api/epis/"+self.id(),
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
    
    self.edit = function () {
        self.isEditing(true);
        setTimeout(function () {
            $('select').formSelect();
        }, 0);
    }
    
    self.remove = function () {
        var epi = {id: self.id(), nome: self.name(), tipo: self.type()};
        $.ajax({
            url: "http://localhost:8081/api/epis/"+self.id(),
            type: "DELETE",
            data: JSON.stringify(epi),
            contentType:"application/json",
            success: function (response) {
                viewModel.list.remove(self);
            },
            error: function (xhr, status) {
                alert("Erro ao deletar EPI");
            }
        });
    }
}

function ViewModel() {
    var self = this;
    
    self.list = ko.observableArray();

    self.addNew = function () {
        self.list.push(new Epi({new : true}));
        setTimeout(function () {
            $('select').formSelect();
        }, 0);
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

if(!localStorage.getItem("isAutenticated")){
	window.location.replace('login.html');
}

var viewModel = new ViewModel();
viewModel.getData();

$(function () {
    ko.applyBindings(viewModel);
});