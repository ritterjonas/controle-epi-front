function EpiFuncionario(data){
	var self = this;

	self.employee = ko.observable(data.employee);
	self.epi = ko.observable(data.epi);
	self.expiringDate = ko.observable(data.expiringDate);

	self.isEditing = ko.observable(!!data.new);
}

function ViewModel(){
	var self = this;

	self.tabActive = ko.observable(1);
	self.setActiveTab = function(index){
		self.tabActive(index);
	}

	self.list = ko.observableArray(ko.utils.arrayMap(api.getEpiFuncionarios(), function(item){
		return new EpiFuncionario(item);
	})); 

	self.addNew = function(){
		self.list.push(new EpiFuncionario({ new: true }));
		setTimeout(function(){ 
    		$('.select').formSelect();
    		$('.datepicker').datepicker({ format: 'yyyy-mm-dd' }) 
		}, 0);
	}

	self.edit = function(data){
		self.save();
		data.isEditing(true);
		setTimeout(function(){ 
    		$('.select').formSelect();
    		$('.datepicker').datepicker({ format: 'yyyy-mm-dd' }) 
		}, 0);
	}

	self.remove = function(data){
		self.list.remove(data);
		self.save();
	}

	self.save = function(){
		ko.utils.arrayForEach(self.list(), function(item){
			item.isEditing(false);
			if(!item.employee())
				self.list.remove(item);
		});
		api.setEpiFuncionarios(ko.toJS(self.list()));
	}

	self.listEmployees = ko.observableArray(api.getFuncionarios());
	self.listEpis = ko.observableArray(api.getEpis());
}

var viewModel = new ViewModel();

$(function(){
	ko.applyBindings(viewModel);
});