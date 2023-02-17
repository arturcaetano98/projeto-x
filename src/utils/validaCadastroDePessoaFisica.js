function validaCPF(cpf) {
    var arrayCPF = cpf.split("");
    var totalPrimeiroDigito = 0, totalSegundoDigito = 0, dig1, dig2, dig3, dig4, dig5, dig6, dig7, dig8, dig9, dig10, dig11;
    var valorPrimeiroDigito = 0, valorSegundoDigito = 0;
    let resultado;
    
    dig1 = arrayCPF[0];
    dig2 = arrayCPF[1];
    dig3 = arrayCPF[2];
    dig4 = arrayCPF[3];
    dig5 = arrayCPF[4];
    dig6 = arrayCPF[5];
    dig7 = arrayCPF[6];
    dig8 = arrayCPF[7];
    dig9 = arrayCPF[8];
    dig10 = arrayCPF[9];
    dig11 = arrayCPF[10];
    
    totalPrimeiroDigito = (dig1*10)+(dig2*9)+(dig3*8)+(dig4*7)+(dig5*6)+(dig6*5)+(dig7*4)+(dig8*3)+(dig9*2);
    totalPrimeiroDigito = (totalPrimeiroDigito % 11);
    
    if(totalPrimeiroDigito < 2){
      valorPrimeiroDigito = 0;
    }
    else{
      valorPrimeiroDigito = 11 - totalPrimeiroDigito;
    }
    
    totalSegundoDigito = (dig1*11)+(dig2*10)+(dig3*9)+(dig4*8)+(dig5*7)+(dig6*6)+(dig7*5)+(dig8*4)+(dig9*3)+(dig10*2);
    totalSegundoDigito = (totalSegundoDigito % 11);

    if(totalSegundoDigito < 2){
      valorSegundoDigito = 0;
    }
    else{
      valorSegundoDigito = 11 - totalSegundoDigito;
    }

    if(dig1 === dig2 && dig2 === dig3 && dig3 === dig4 && dig4 === dig5 && dig5 === dig6 && dig6 === dig7 && 
      dig7 === dig8 && dig8 === dig9 && dig9 === dig10 && dig10 === dig11 && dig11 === dig1){
        resultado = false;
    }
    else if((valorPrimeiroDigito == dig10) && (valorSegundoDigito == dig11)){
      resultado = true;
    }
    else{
      resultado = false;
    }
    
    return resultado;
  }

export default validaCPF;