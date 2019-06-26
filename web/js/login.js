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

		$.ajax({
			url: "http://localhost:8081/api/login",
			type: "POST",
			data: JSON.stringify({ email: self.user(), password: self.password() }),
			contentType:"application/json",
			success: function (response) {
				if(response.success){
					localStorage.setItem("isAutenticated", "true");
					window.location.replace('index.html');
				} else {
					self.incorrectLogin(true);
					self.incorrectLoginMessage(response.message);
				}
			},
			error: function (xhr, status) {
				self.incorrectLogin(true);
				self.incorrectLoginMessage("Erro ao efetuar login");
			}
		});

	}
}

localStorage.clear();

var viewModel = new ViewModel();

$(function(){
	ko.applyBindings(viewModel);
});