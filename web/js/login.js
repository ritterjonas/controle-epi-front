function ViewModel(){
	var self = this;

	self.user = ko.observable().extend({
		required: {
			message: 'Obrigatório'
		}
	});
	self.password = ko.observable().extend({
		required: {
			message: 'Obrigatório'
		}
	});

	self.incorrectLogin = ko.observable(false);
	self.incorrectLoginMessage = ko.observable('Login ou senha incorretos');
    self.errors = ko.validation.group(self);

	self.login = function(){
		if(self.errors().length > 0) {
            return;
        }

        if(self.user() != 'admin' || self.password() != 'admin'){
        	self.incorrectLogin(true);
        	return;
        }

        window.location.replace('dashboard.html');
	}
}

var viewModel = new ViewModel();

$(function(){
	ko.applyBindings(viewModel);
});