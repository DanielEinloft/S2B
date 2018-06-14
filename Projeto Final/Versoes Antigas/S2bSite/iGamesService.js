class Pessoas {
    buscarPessoas() {
        return [
            {codigo:1,nome:'Um Nome',idade:12},
            {codigo:2,nome:'Outro Nome',idade:25}
        ];
    }
}

angular
.module('iGames')
.service('pessoasServico', Pessoas);