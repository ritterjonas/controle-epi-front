function Funcionario(data) {
    var self = this;

    self.id = ko.observable(data.idFuncionario);
    self.name = ko.observable(data.nome);
    self.street = ko.observable(data.rua);
    self.number = ko.observable(data.numero);
    self.city = ko.observable(data.cidade);
    self.state = ko.observable(data.estado);
    self.country = ko.observable(data.pais);
    self.cep = ko.observable(data.cep);
    self.cpf = ko.observable(data.cpf);
    self.email = ko.observable(data.email);
    self.phone = ko.observable(data.telefone);
    self.job = ko.observable(data.cargo);
    self.admin = ko.observable(data.administrador);
    self.date = ko.observable(moment(data.dataNascimento).format('DD/MM/YYYY'));
    
    self.isEditing = ko.observable(!!data.new);
    
    self.save = function () {
        ko.utils.arrayForEach(viewModel.list(), function (item) {            
            item.isEditing(false);
        });
        
        if(!self.name()) {
            viewModel.list.remove(self);
            return;
        }
        
        var funcionario = {
            nome: self.name(),
            rua: self.street(),
            numero: self.number(),
            cidade: self.city(),
            estado: self.state(),
            pais: self.country(),
            cep: self.cep(),
            cpf: self.cpf(),
            email: self.email(),
            telefone: self.phone(),
            cargo: self.job(),
            administrador: self.admin() == '0' ? false : true,
            dataNascimento: moment(self.date(), 'DD/MM/YYYY').toDate()
        };

        if(!self.id()){
            $.ajax({
                url: "http://localhost:8081/api/funcionarios/",
                type: "POST",
                data: JSON.stringify(funcionario),
                contentType:"application/json",
                success: function (response) {
                    self.id(response.idFuncionario);
                },
                error: function (xhr, status) {
                    alert("Erro ao inserir Funcionario");
                }
            });
        } else{
            $.ajax({
                url: "http://localhost:8081/api/funcionarios/"+self.id(),
                type: "PUT",
                data: JSON.stringify(funcionario),
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
        var funcionario = {
            nome: self.name(),
            rua: self.street(),
            numero: self.number(),
            cidade: self.city(),
            estado: self.state(),
            pais: self.country(),
            cep: self.cep(),
            cpf: self.cpf(),
            email: self.email(),
            telefone: self.phone(),
            cargo: self.job(),
            admin: self.admin(),
            dataNascimento: self.date()
        };
        $.ajax({
            url: "http://localhost:8081/api/funcionarios/"+self.id(),
            type: "DELETE",
            data: JSON.stringify(funcionario),
            contentType:"application/json",
            success: function (response) {
                viewModel.list.remove(self);
            },
            error: function (xhr, status) {
                alert("Erro ao deletar Funcionario");
            }
        });
    }
}

function ViewModel() {
    var self = this;

    self.list = ko.observableArray();

    self.tabActive = ko.observable(1);
    self.setActiveTab = function (index) {
        self.tabActive(index);
    }

    self.addNew = function () {
        self.list.push(new Funcionario({new : true}));
        setTimeout(function () {
            $('.datepicker').datepicker({format: 'dd/mm/yyyy'})
            $('select').formSelect();
        }, 0);
    }
    
    self.getData = function(){
        $.ajax({
            url: "http://localhost:8081/api/funcionarios/",
            type: "GET",            
            success: function (response) {
                self.list(ko.utils.arrayMap(response, function (item) {
                    return new Funcionario(item);
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