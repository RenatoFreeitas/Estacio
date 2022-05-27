export default function calculaIdade(dataNasc){ 
    var dataAtual = new Date();
    var diaAtual = dataAtual.getDate();
    var mesAtual = dataAtual.getMonth() + 1; 
    var anoAtual = dataAtual.getFullYear();
    var anoNascParts = dataNasc.split('/');
    var diaNasc =anoNascParts[0];
    var mesNasc =anoNascParts[1];
    var anoNasc =anoNascParts[2];
    var idade = anoAtual - anoNasc;
    
    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
    if(mesAtual < mesNasc){
    idade--; 
    } else {
    //Se estiver no mes do nascimento, verificar o dia
    if(mesAtual == mesNasc){ 
    if(diaAtual < diaNasc ){ 
    //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
    idade--; 
    }
    }
    }
    return idade;
}