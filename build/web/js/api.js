function Api() {
    var self = this;

    self.getFuncionarios = function () {
        return JSON.parse(localStorage.getItem('funcionarios'));
    }
    self.setFuncionarios = function (list) {
        localStorage.setItem('funcionarios', JSON.stringify(list));
    }

    self.getSetores = function () {
        return JSON.parse(localStorage.getItem('setores'));
    }
    self.setSetores = function (list) {
        localStorage.setItem('setores', JSON.stringify(list));
    }

    self.getEpiFuncionarios = function () {
        return JSON.parse(localStorage.getItem('epiFuncionarios'));
    }
    self.setEpiFuncionarios = function (list) {
        localStorage.setItem('epiFuncionarios', JSON.stringify(list));
    }

    self.getEpis = function () {
        return JSON.parse(localStorage.getItem('epis'));
    }
    self.setEpis = function (list) {
        localStorage.setItem('epis', JSON.stringify(list));
    }

    self.getInappropriatedEpiList = function () {
        return JSON.parse(localStorage.getItem('inappropriatedepilist'));
    }
    self.setInappropriatedEpiList = function (list) {
        localStorage.setItem('inappropriatedepilist', JSON.stringify(list));
    }
    self.addInappropriatedEpiList = function (item) {
        var list = self.getInappropriatedEpiList();
        list.push(item);
        self.setInappropriatedEpiList(list);
    }

    self.getAppropriatedEpiList = function () {
        return JSON.parse(localStorage.getItem('appropriatedepilist'));
    }
    self.setAppropriatedEpiList = function (list) {
        localStorage.setItem('appropriatedepilist', JSON.stringify(list));
    }
    self.addAppropriatedEpiList = function (item) {
        var list = self.getAppropriatedEpiList();
        list.push(item);
        self.setAppropriatedEpiList(list);
    }

    self.getMachineAlerts = function () {
        return JSON.parse(localStorage.getItem('machinealerts'));
    }
    self.setMachineAlerts = function (list) {
        localStorage.setItem('machinealerts', JSON.stringify(list));
    }
}
var api = new Api();

function cargaInicial() {
    api.setFuncionarios([
        {name: 'Jonas Ritter', street: 'Rua teste 1', number: 10, city: 'Rio Claro', state: 'SP', country: 'Brasil', cep: '21212-212', cpf: '43391327804', email: 'jonas@teste.com', job: 'Torneiro Mecanico', admin: 0, date: '1990-11-22'},
        {name: 'Gabriel Torres', street: 'Rua teste 2', number: 20, city: 'Cosmópolis', state: 'SP', country: 'Brasil', cep: '94833-233', cpf: '17150154876', email: 'gabriel@teste.com', job: 'Faxineiro', admin: 0, date: '1991-02-15'},
        {name: 'Toninho Rodrigues', street: 'Rua teste 3', number: 212, city: 'Piracicaba', state: 'SP', country: 'Brasil', cep: '02872-211', cpf: '24875412458', email: 'toninho@teste.com', job: 'Inspetor de qualidade', admin: 1, date: '1975-05-04'},
    ]);
    api.setSetores([
        {id: 'Tornearia', responsible: 'Jonas Ritter', epis: ['Capacete', 'Luva', 'Bota']},
        {id: 'Montagem', responsible: 'Gabriel Torres', epis: ['Capacete', 'Luva']},
        {id: 'Transporte', responsible: 'Gabriel Torres', epis: ['Bota']},
    ]);
    api.setEpis([
        {name: 'Capacete', type: 'Cabeça'},
        {name: 'Luva', type: 'Mãos'},
        {name: 'Bota', type: 'Pés'},
    ]);
    api.setEpiFuncionarios([
        {employee: 'Gabriel Torres', epi: 'Capacete', expiringDate: '2016-06-25'},
        {employee: 'Gabriel Torres', epi: 'Luva', expiringDate: '2017-11-26'},
        {employee: 'Tiago Remédio', epi: 'Bota', expiringDate: '2018-09-11'},
        {employee: 'Jonas Ritter', epi: 'Luva', expiringDate: '2018-12-30'},
    ]);
    api.setInappropriatedEpiList([
        {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Montagem', date: '22/11/2018 14:10:35', description: 'EPI ausente', status: 1},
        {epi: 'Botina', name: 'Gabriel Torres', area: 'Transporte', date: '22/11/2018 15:12:31', description: 'Fora do prazo de validade', status: 1},
        {epi: 'Luvas', name: 'Tiago Remédio', area: 'Tornearia', date: '22/11/2018 15:18:35', description: 'EPI ausente', status: 1},
        {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: '22/11/2018 15:22:14', description: 'EPI ausente', status: 1}
    ]);
    api.setAppropriatedEpiList([
        {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Montagem', date: '22/11/2018 14:10:35'},
        {epi: 'Botina', name: 'Gabriel Torres', area: 'Transporte', date: '22/11/2018 15:12:31'},
        {epi: 'Luvas', name: 'Tiago Remédio', area: 'Tornearia', date: '22/11/2018 15:18:35'},
        {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: '22/11/2018 15:22:14'},
        {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Montagem', date: '22/11/2018 14:10:35'},
        {epi: 'Botina', name: 'Gabriel Torres', area: 'Transporte', date: '22/11/2018 15:12:31'},
        {epi: 'Luvas', name: 'Tiago Remédio', area: 'Tornearia', date: '22/11/2018 15:18:35'},
        {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: '22/11/2018 15:22:14'},
        {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Montagem', date: '22/11/2018 14:10:35'},
        {epi: 'Botina', name: 'Gabriel Torres', area: 'Transporte', date: '22/11/2018 15:12:31'},
        {epi: 'Luvas', name: 'Tiago Remédio', area: 'Tornearia', date: '22/11/2018 15:18:35'},
        {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: '22/11/2018 15:22:14'},
        {epi: 'Óculos de proteção', name: 'Jonas Ritter', area: 'Montagem', date: '22/11/2018 14:10:35'},
        {epi: 'Botina', name: 'Gabriel Torres', area: 'Transporte', date: '22/11/2018 15:12:31'},
        {epi: 'Luvas', name: 'Tiago Remédio', area: 'Tornearia', date: '22/11/2018 15:18:35'},
        {epi: 'Protetor auricular', name: 'Jonas Ritter', area: 'Tornearia', date: '22/11/2018 15:22:14'}
    ]);
    api.setMachineAlerts([
        {machine: 'Esteira 1', name: 'Tiago Remédio', area: 'Montagem', date: '22/11/2018 14:10:35', description: 'Superaquecimento', status: 1},
        {machine: 'Ponte Rolante', name: 'Gabriel Torres', area: 'Transporte', date: '22/11/2018 15:12:31', description: 'Parada emergencial', status: 1},
        {machine: 'Torno', name: 'Jonas Ritter', area: 'Tornearia', date: '22/11/2018 15:18:35', description: 'Mal funcionamento', status: 1},
    ]);
}

