function Setor(data){
	var self = this;

	self.id = ko.observable(data.id);
	self.responsible = ko.observable(data.responsible);
	self.epis = ko.observableArray(data.epis);

	self.isEditing = ko.observable(!!data.new);
}

function ViewModel(){
	var self = this;

	self.tabActive = ko.observable(1);
	self.setActiveTab = function(index){
		self.tabActive(index);
	}

	self.list = ko.observableArray(ko.utils.arrayMap(api.getSetores(), function(item){
		return new Setor(item);
	})); 

	self.addNew = function(){
		self.list.push(new Setor({ new: true }));
		setTimeout(function(){ 
    		$('.select').formSelect();
    		$('.multiple-select').formSelect({ isMultiple: true });
		}, 0);
	}

	self.edit = function(data){
		self.save();
		data.isEditing(true);
		setTimeout(function(){ 
    		$('.select').formSelect();
    		$('.multiple-select').formSelect({ isMultiple: true });
		}, 0);
	}

	self.remove = function(data){
		self.list.remove(data);
		self.save();
	}

	self.save = function(){
		ko.utils.arrayForEach(self.list(), function(item){
			item.isEditing(false);
			if(!item.id())
				self.list.remove(item);
		});
		api.setSetores(ko.toJS(self.list()));
	}

	self.listEmployees = ko.observableArray(api.getFuncionarios());
	self.listEpis = ko.observableArray(api.getEpis());
}

var viewModel = new ViewModel();

$(function(){
	ko.applyBindings(viewModel);
});