function EpiFuncionario(data) {
    var self = this;

    self.id = ko.observable(data.idEpiFuncionario);
    self.employee = ko.observable(data.responsavel ? data.responsavel.idFuncionario : null);
    self.epi = ko.observable(data.epi ? data.epi.idEpi : null);
    self.expiringDate = ko.observable(moment(data.validade).format('DD/MM/YYYY'));

    self.isEditing = ko.observable(!!data.new);
    
    self.save = function () {
        ko.utils.arrayForEach(viewModel.list(), function (item) {            
            item.isEditing(false);
            if (!item.employee() || !item.epi())
                viewModel.list.remove(item);
        });
        
        var epiFuncionario = {epiId: self.epi(), funcionarioId: self.employee(), validade: moment(self.expiringDate(), 'DD/MM/YYYY').toDate() };

        if(!self.id()){
            $.ajax({
                url: "http://localhost:8081/api/epi_funcionario/",
                type: "POST",
                data: JSON.stringify(epiFuncionario),
                contentType:"application/json",
                success: function (response) {
                    self.id(response.idEpiFuncionario);
                },
                error: function (xhr, status) {
                    alert("Erro ao inserir Funcionario");
                }
            });
        } else{
            $.ajax({
                url: "http://localhost:8081/api/epi_funcionario/"+self.id(),
                type: "PUT",
                data: JSON.stringify(epiFuncionario),
                contentType:"application/json",
                success: function (response) {  
                },
                error: function (xhr, status) {
                    alert("Erro ao editar Funcionario");
                }
            });
        }
    }
    
    self.edit = function () {        
        self.isEditing(true);
        setTimeout(function () {
            $('.datepicker').datepicker({format: 'dd/mm/yyyy'});
            $('select').formSelect();
        }, 0);
    }
    
    self.remove = function () {
        var epiFuncionario = {epiId: self.epi(), funcionarioId: self.employee(), validade: self.expiringDate()};
        $.ajax({
            url: "http://localhost:8081/api/epi_funcionario/"+self.id(),
            type: "DELETE",
            data: JSON.stringify(epiFuncionario),
            contentType:"application/json",
            success: function (response) {
                viewModel.list.remove(self);
            },
            error: function (xhr, status) {
                alert("Erro ao deletar Funcionario");
            }
        });
    }
    
    self.getFuncionarioName = function(){
        var name = null;
        ko.utils.arrayForEach(viewModel.listFuncionarios(), function(func){
            if(self.employee() == func.id()){
                name = func.name();
            }
        });
        return name;
    }
    
    self.getEpiDescription = function(){
        var description = null;
        ko.utils.arrayForEach(viewModel.listEpis(), function(epi){
            if(self.epi() == epi.id()){
                description = epi.name();
            }
        });
        return description;
    }
}

function Epi(data) {
    var self = this;
    self.id = ko.observable(data.idEpi);
    self.name = ko.observable(data.nome);
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
        self.list.push(new EpiFuncionario({new : true}));
        setTimeout(function () {
            $('.select').formSelect();
            $('.datepicker').datepicker({format: 'dd/mm/yyyy'})
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
        
        //get epi_funcionarios
        $.ajax({
            url: "http://localhost:8081/api/epi_funcionario/",
            type: "GET",            
            success: function (response) {
                self.list(ko.utils.arrayMap(response, function (item) {
                    return new EpiFuncionario(item);
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