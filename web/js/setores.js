function Setor(data) {
    var self = this;

    self.id = ko.observable(data.idSetor);
    self.description = ko.observable(data.descricao);
    self.responsible = ko.observable(data.responsavel ? data.responsavel.idFuncionario : null);
    
    self.epis = ko.observableArray((ko.utils.arrayMap(data.epis, function (item) {
        return item.epi.idEpi;
    })));

    self.isEditing = ko.observable(!!data.new);
    
    self.getEpiNames = function(){
        var response = [];
        ko.utils.arrayForEach(self.epis(), function(epi){
            ko.utils.arrayForEach(viewModel.listEpis(), function(epiVm){
                if(epi == epiVm.id()){
                    response.push(epiVm.name());
                }
            });
        });
        return response.join(", ");
    }
    
    self.getFuncionarioName = function(){
        var name = null;
        ko.utils.arrayForEach(viewModel.listFuncionarios(), function(func){
            if(self.responsible() == func.id()){
                name = func.name();
            }
        });
        return name;
    }
    
    self.save = function () {
        ko.utils.arrayForEach(viewModel.list(), function (item) {            
            item.isEditing(false);
            if (!item.description() || item.epis().length == 0)
                viewModel.list.remove(item);
        });
        
        if(!self.description() || self.epis().length == 0) return;
        
        var setor = {descricao: self.description(), responsavelId: self.responsible(), epis: self.epis()};

        if(!self.id()){
            $.ajax({
                url: "http://localhost:8081/api/setor/",
                type: "POST",
                data: JSON.stringify(setor),
                contentType:"application/json",
                success: function (response) {
                    self.id(response.idSetor);
                },
                error: function (xhr, status) {
                    alert("Erro ao inserir Setor");
                }
            });
        } else{
            $.ajax({
                url: "http://localhost:8081/api/setor/"+self.id(),
                type: "PUT",
                data: JSON.stringify(setor),
                contentType:"application/json",
                success: function (response) {  
                },
                error: function (xhr, status) {
                    alert("Erro ao editar Setor");
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
        var setor = {descricao: self.description(), responsavelId: self.responsible(), epis: self.epis()};
        $.ajax({
            url: "http://localhost:8081/api/setor/"+self.id(),
            type: "DELETE",
            data: JSON.stringify(setor),
            contentType:"application/json",
            success: function (response) {
                viewModel.list.remove(self);
            },
            error: function (xhr, status) {
                alert("Erro ao deletar Setor");
            }
        });
    }
}

function Epi(data) {
    var self = this;
    self.id = ko.observable(data.idEpi);
    self.name = ko.observable(data.nome);
    self.type = ko.observable(data.tipo);
}

function Funcionario(data) {
    var self = this;
    self.id = ko.observable(data.idFuncionario);
    self.name = ko.observable(data.nome);
}

function ViewModel() {
    var self = this;
    
    self.list = ko.observableArray();
    self.listEpis = ko.observableArray();
    self.listFuncionarios = ko.observableArray();

    self.tabActive = ko.observable(1);
    self.setActiveTab = function (index) {
        self.tabActive(index);
    }

    self.addNew = function () {
        self.list.push(new Setor({new : true}));
        setTimeout(function () {
            $('.select').formSelect();
            $('.multiple-select').formSelect({isMultiple: true});
        }, 0);
    }

    self.getData = function(){
        //get epis
        $.ajax({
            url: "http://localhost:8081/api/epis/",
            type: "GET",            
            success: function (response) {
                self.listEpis(ko.utils.arrayMap(response, function (item) {
                    return new Epi(item);
                }));
            },
            error: function (xhr, status) {
                alert("Erro ao carregar dados");
            }
        });
        
        //get funcionarios
        $.ajax({
            url: "http://localhost:8081/api/funcionarios/",
            type: "GET",            
            success: function (response) {
                self.listFuncionarios(ko.utils.arrayMap(response, function (item) {
                    return new Funcionario(item);
                }));
            },
            error: function (xhr, status) {
                alert("Erro ao carregar dados");
            }
        });
        
        //get setores
        $.ajax({
            url: "http://localhost:8081/api/setor/",
            type: "GET",            
            success: function (response) {
                self.list(ko.utils.arrayMap(response, function (item) {
                    return new Setor(item);
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