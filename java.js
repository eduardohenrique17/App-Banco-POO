class ContaBancaria {
    constructor(titular, numeroConta) {
        this.titular = titular;
        this.saldo = 0;
        this.numeroConta = numeroConta;
    }

    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            return `Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`;
        } else {
            return 'O valor do depósito deve ser maior que zero.';
        }
    }

    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            return `Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`;
        } else if (valor > this.saldo) {
            return 'Saldo insuficiente para realizar o saque.';
        } else {
            return 'O valor do saque deve ser maior que zero.';
        }
    }

    consultarSaldo() {
        return `Saldo atual: R$ ${this.saldo.toFixed(2)}.`;
    }
}

const contas = [];
let contador = 1; // Contador para o número da conta

function criarConta() {
    const nome = prompt('Digite o nome do titular da conta:');
    if (nome) {
        const novaConta = new ContaBancaria(nome, contador++);
        contas.push(novaConta);
        return `Conta criada com sucesso para ${nome}. Número da conta: ${novaConta.numeroConta}`;
    } else {
        return 'Nome do titular não pode ser vazio.';
    }
}

function depositar() {
    const numeroConta = prompt('Digite o número da conta:');
    const valor = parseFloat(prompt('Digite o valor a ser depositado:'));
    const conta = contas.find(c => c.numeroConta === parseInt(numeroConta));
    if (conta) {
        return conta.depositar(valor);
    } else {
        return 'Conta não encontrada.';
    }
}

function sacar() {
    const numeroConta = prompt('Digite o número da conta:');
    const valor = parseFloat(prompt('Digite o valor a ser sacado:'));
    const conta = contas.find(c => c.numeroConta === parseInt(numeroConta));
    if (conta) {
        return conta.sacar(valor);
    } else {
        return 'Conta não encontrada.';
    }
}

function consultarSaldo() {
    const numeroConta = prompt('Digite o número da conta:');
    const conta = contas.find(c => c.numeroConta === parseInt(numeroConta));
    if (conta) {
        return conta.consultarSaldo();
    } else {
        return 'Conta não encontrada.';
    }
}

function listarContas() {
    if (contas.length === 0) {
        return 'Nenhuma conta cadastrada.';
    }
    return contas.map(c => `Titular: ${c.titular}, Número da conta: ${c.numeroConta}, Saldo: R$ ${c.saldo.toFixed(2)}`).join('\n');
}

function sair() {
    return 'Saindo do sistema...';
}

// Interação com o usuário
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        let resultado;
        switch (this.id) {
            case 'createAccount':
                resultado = criarConta();
                break;
            case 'deposit':
                resultado = depositar();
                break;
            case 'withdraw':
                resultado = sacar();
                break;
            case 'checkBalance':
                resultado = consultarSaldo();
                break;
            case 'listAccounts':
                resultado = listarContas();
                break;
            case 'exit':
                resultado = sair();
                break;
            default:
                resultado = 'Opção inválida.';
        }
        document.getElementById('output').textContent = resultado;
    });
});