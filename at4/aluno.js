class Aluno {
    constructor(nome, notas) {
        this.nome = nome;
        this.notas = notas;
    }

    calcularMedia() {
        const soma = this.notas.reduce((acc, nota) => acc + nota, 0);
        const media = soma / this.notas.length;
        if (media > 10.0) throw new Error('Média acima da máxima permitida!');
        return media;
    }

    obterMencao() {
        const media = this.calcularMedia();
        if (media >= 9) return 'SS';
        if (media >= 7) return 'MS';
        if (media >= 5) return 'MM';
        return 'MI';
    }

    statusAprovacao() {
        const mencao = this.obterMencao();
        if (mencao !== 'MI' && mencao !== 'II') return 'aprovad@';
        return 'reprovad@';
    }
}

module.exports = Aluno;

const Aluno = require('./Aluno');

describe('Testes da classe Aluno', () => {
    let aluno;

    beforeEach(() => {
        aluno = new Aluno('João', [8, 6]);
    });

    // 1. Testar se a média está sendo calculada corretamente
    test('calcularMedia deve retornar a média correta', () => {
        expect(aluno.calcularMedia()).toBe(7);
    });

    // 2. Testar se a menção "MS" é retornada corretamente
    test('obterMencao deve retornar MS para média >= 7 e < 9', () => {
        expect(aluno.obterMencao()).toBe('MS');
    });

    // 3. Testar se o aluno foi aprovado com menção MS
    test('statusAprovacao deve retornar "aprovad@" para menção MS', () => {
        expect(aluno.statusAprovacao()).toBe('aprovad@');
    });

    // 4. Testar para menção "SS"
    test('obterMencao deve retornar SS para média >= 9', () => {
        aluno = new Aluno('Maria', [10, 9]);
        expect(aluno.obterMencao()).toBe('SS');
    });

    // 5. Testar se o aluno foi aprovado com menção SS
    test('statusAprovacao deve retornar "aprovad@" para menção SS', () => {
        aluno = new Aluno('Maria', [10, 9]);
        expect(aluno.statusAprovacao()).toBe('aprovad@');
    });

    // 6. Testar para menção "MM"
    test('obterMencao deve retornar MM para média >= 5 e < 7', () => {
        aluno = new Aluno('Carlos', [5, 6]);
        expect(aluno.obterMencao()).toBe('MM');
    });

    // 7. Testar se o aluno foi aprovado com menção MM
    test('statusAprovacao deve retornar "aprovad@" para menção MM', () => {
        aluno = new Aluno('Carlos', [5, 6]);
        expect(aluno.statusAprovacao()).toBe('aprovad@');
    });

    // 8. Testar para menção "MI"
    test('obterMencao deve retornar MI para média < 5', () => {
        aluno = new Aluno('José', [3, 4]);
        expect(aluno.obterMencao()).toBe('MI');
    });

    // 9. Testar se o aluno foi reprovado com menção MI
    test('statusAprovacao deve retornar "reprovad@" para menção MI', () => {
        aluno = new Aluno('José', [3, 4]);
        expect(aluno.statusAprovacao()).toBe('reprovad@');
    });

    // 10. Testar se a média de um array vazio retorna NaN
    test('calcularMedia deve retornar NaN se notas estiverem vazias', () => {
        aluno = new Aluno('Teste', []);
        expect(aluno.calcularMedia()).toBeNaN();
    });

    // 11. Testar se notas com valores decimais são calculadas corretamente
    test('calcularMedia deve funcionar com notas decimais', () => {
        aluno = new Aluno('Roberto', [5.5, 6.4]);
        expect(aluno.calcularMedia()).toBeCloseTo(5.95, 2);
    });

    // 12. Testar se notas fora do intervalo [0,10] geram erro
    test('calcularMedia deve lançar erro para média acima de 10', () => {
        aluno = new Aluno('Erika', [11, 12]);
        expect(() => aluno.calcularMedia()).toThrow('Média acima da máxima permitida!');
    });

    // 13. Testar se as notas são números
    test('calcularMedia deve retornar NaN se notas não forem números', () => {
        aluno = new Aluno('Lucas', [8, 'a']);
        expect(() => aluno.calcularMedia()).toThrow(TypeError);
    });

    // 14. Testar se o aluno pode ser aprovado faltando uma prova e tirando nota máxima na última
    test('statusAprovacao deve retornar "aprovad@" para aluno com uma nota 0 e outra 10', () => {
        aluno = new Aluno('Ana', [0, 10]);
        expect(aluno.statusAprovacao()).toBe('aprovad@');
    });

    // 15. Testar se todas as notas iguais a zero retornam menção "MI"
    test('obterMencao deve retornar MI se todas as notas forem 0', () => {
        aluno = new Aluno('Jorge', [0, 0]);
        expect(aluno.obterMencao()).toBe('MI');
    });

    // 16. Testar se notas muito próximas de 7 retornam a menção correta
    test('obterMencao deve retornar MM para média próxima de 7', () => {
        aluno = new Aluno('Eduardo', [6.7, 7.1]);
        expect(aluno.obterMencao()).toBe('MM');
    });

    // 17. Testar se uma única nota zero afeta a aprovação
    test('statusAprovacao deve retornar "reprovad@" se uma das notas for 0', () => {
        aluno = new Aluno('Bruno', [0, 8]);
        expect(aluno.statusAprovacao()).toBe('reprovad@');
    });

    // 18. Testar se a soma total das notas é correta
    test('calcularMedia deve somar corretamente as notas', () => {
        aluno = new Aluno('Helena', [10, 10]);
        expect(aluno.calcularMedia()).toBe(10);
    });

    // 19. Testar se a função aprovado funciona com menção MM
    test('statusAprovacao deve aprovar aluno com média entre 5 e 7', () => {
        aluno = new Aluno('Bruna', [6, 5]);
        expect(aluno.statusAprovacao()).toBe('aprovad@');
    });

    // 20. Testar se aluno com notas abaixo de 5 é reprovado
    test('statusAprovacao deve reprovar aluno com média abaixo de 5', () => {
        aluno = new Aluno('Roberta', [4, 3]);
        expect(aluno.statusAprovacao()).toBe('reprovad@');
    });
});
