function ViewModel(){
	var self = this;

	self.list = ko.observableArray();

	self.generateReport = function(data){
		var dataFormated = ko.utils.arrayMap(data(), function(item){
			var itemresponse = {};
			if(item.epi) itemresponse['EPI'] = item.epi;
			if(item.machine) itemresponse['Máquina'] = item.machine;
			if(item.name) itemresponse['Funcionário'] = item.name;
			if(item.area) itemresponse['Setor'] = item.area;
			if(item.date) itemresponse['Data'] = item.date;
			if(item.description) itemresponse['Irregularidade'] = item.description;
			if(item.status) itemresponse['Status'] = item.status == 1 ? 'Resolver' : 'Resolvido';
			return itemresponse;
		});
		var ws = XLSX.utils.json_to_sheet(dataFormated);
		var wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Dados");
		XLSX.writeFile(wb, "Relatorio.xlsx");
	}

	self.getEpis = function(epis){
		return ko.utils.arrayMap(epis, function(item){
			return item.epi.nome;
		}).join(', ');
	}

	self.regulares = ko.computed(function(){
		return ko.utils.arrayFilter(self.list(), function(item){
			return item.status;
		}).length;
	});
	
	self.irregulares = ko.computed(function(){
		return ko.utils.arrayFilter(self.list(), function(item){
			return !item.status;
		}).length;
	});

    self.getData = function(){
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

$(function(){
	ko.applyBindings(viewModel);
});