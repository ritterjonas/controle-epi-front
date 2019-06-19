function ViewModel() {
    var self = this;

    self.status = ko.observable(0);
    self.error = ko.observable('Seu oculos de proteção está com o prazo de validade expirado');
    self.funcionario = ko.observable();

    self.simular = function () {
        var item = viewModel.listaSimulacao.shift();
        self.funcionario(item.name);

        ko.utils.arrayForEach(item.listOk, function (item) {
            api.addAppropriatedEpiList(item);
        });
        ko.utils.arrayForEach(item.listNok, function (item) {
            api.addInappropriatedEpiList(item);
        });

        if (item.ok) {
            self.status(1);
        } else {
            self.status(2);
            self.error(item.message);
        }

        setTimeout(function () {
            self.status(0);
            self.funcionario(null);
        }, 3000);
    }

    self.listaSimulacao = ko.observableArray([
        {
            ok: true,
            name: 'Gabriel Torres',
            message: '',
            listOk: [
                {epi: 'Protetor auricular', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Luvas', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Óculos de proteção', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: []
        },
        {
            ok: false,
            name: 'Jonas Ritter',
            message: 'Seu oculos de proteção está com o prazo de validade expirado',
            listOk: [
                {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Luvas', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: [
                {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS'), description: 'Fora do prazo de validade', status: 1}
            ]
        },
        {
            ok: true,
            name: 'Tiago Remedio',
            message: '',
            listOk: [
                {epi: 'Protetor auricular', name: 'Tiago Remedio', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Luvas', name: 'Tiago Remedio', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Tiago Remedio', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Óculos de proteção', name: 'Tiago Remedio', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: []
        },
        {
            ok: true,
            name: 'Jonas Ritter',
            message: '',
            listOk: [
                {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Luvas', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: []
        },
        {
            ok: false,
            name: 'Gabriel Torres',
            message: 'Você não está utilizando protetor auricular',
            listOk: [
                {epi: 'Luvas', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Óculos de proteção', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: [
                {epi: 'Protetor auricular', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS'), description: 'EPI ausente', status: 1},
            ]
        },
        {
            ok: true,
            name: 'Gabriel Torres',
            message: '',
            listOk: [
                {epi: 'Protetor auricular', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Luvas', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Óculos de proteção', name: 'Gabriel Torres', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: []
        },
        {
            ok: true,
            name: 'Jonas Ritter',
            message: '',
            listOk: [
                {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Luvas', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: []
        },
        {
            ok: true,
            name: 'Gabriel Torres',
            message: '',
            listOk: [
                {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Luvas', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: []
        },
        {
            ok: true,
            name: 'Tiago Remedio',
            message: '',
            listOk: [
                {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Luvas', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Botina', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')},
                {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Tornearia', date: moment().format('YYYY-MM-DD HH:mm:SS')}
            ],
            listNok: []
        }
    ]);
}

var viewModel = new ViewModel();

$(function () {
    ko.applyBindings(viewModel);
});