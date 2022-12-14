class ValidaCPF {
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    Sequencia(){
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfSemDigito = this.cpfLimpo.slice(0, -2)    
        const digito1 = ValidaCPF.geraDigito(cpfSemDigito)
        const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1)
        this.novoCPF = cpfSemDigito + digito1 + digito2
    }

    static geraDigito(cpfSemDigito){
        let total = 0;
        let reverso = cpfSemDigito.length + 1
        for(let stringNumerica of cpfSemDigito){
            total += reverso * Number(stringNumerica);
            reverso--

        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito): '0';
    }

    valida() {
        if(!this.cpfLimpo) return 'erro 414, preencha todo o campo CPF'
        if(typeof this.cpfLimpo !== 'string') return 'erro 323, coloquei um cpf VALIDO'
        if(this.cpfLimpo.length !== 11) return 'esta faltando numeros no seu cpf, por favor complete com os 11 digitos'
        if(this.Sequencia()) return 'CPF INVALIDO'
        this.geraNovoCpf()
        return this.novoCPF === this.cpfLimpo; 
    }
}

const validaCpf = new ValidaCPF('11518007600')
if (validaCpf.valida()) {
    console.log('CPF valido')
}   else {
    console.log('cpf Invalido')
}