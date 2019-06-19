function ViewModel(){
	var self = this;

	self.tabActive = ko.observable(1);
	self.setActiveTab = function(index){
		self.tabActive(index);
	}

	self.inappropriatedEpiList = ko.observableArray(api.getInappropriatedEpiList());
	self.inappropriatedEpiListCount = ko.computed(function(){
		return ko.utils.arrayFilter(self.inappropriatedEpiList(), function(item){ return item.status == 1 }).length;
	});

	self.appropriatedEpiList = ko.observableArray(api.getAppropriatedEpiList());
	self.machineAlerts = ko.observableArray(api.getMachineAlerts());
	self.machineAlertsCount = ko.computed(function(){
		return ko.utils.arrayFilter(self.machineAlerts(), function(item){ return item.status == 1 }).length;
	});

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

	self.resolve = function(data){
		if(data.status != 1)
			return;

		data.status = 2;
		api.setInappropriatedEpiList(self.inappropriatedEpiList());
		self.inappropriatedEpiList([]);
		self.inappropriatedEpiList(api.getInappropriatedEpiList());

		api.setMachineAlerts(self.machineAlerts());
		self.machineAlerts([]);
		self.machineAlerts(api.getMachineAlerts());
	}
}

var viewModel = new ViewModel();

$(function(){
	ko.applyBindings(viewModel);
});