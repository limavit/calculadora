class CalcControler{

    constructor(){
        this._operation = [];
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        // o _ significa que é private
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        
    }

    initialize(){
     //setinterval executa essa função de forma intermitente em um intervalo de tempo
     // em milisegundos
        this.setDisplayDateTime();
        let interval = setInterval(()=>{
            this.setDisplayDateTime();
            
        }, 1000);

        /* setTimeout(()=>{
            clearInterval(interval);
        }, 10000); 
        só pra testar o pause depois de 10 segundos
        tivemos que salvar o id do setInterval dentro da variavel interval
        */
        
    }
    //criamos este evento para tratar multiplos eventos
    //EVENTO CUSTOMIZAVEL, NOS CRIAMOS. NAO EXISTE NO JAVASCRIPT
    addEventListenerAll(element, evetns, fn){
        evetns.split(' ').forEach(event =>{
            element.addEventListener(event, fn ,false);
        });
    }
    
    clearAll(){
        this._operation = [];
    }

    calcelEntry(){
        this._operation.pop();
    }
    addOperatoration(value){
        this._operation.push(value);
        console.log(this._operation);
    }
    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){
        switch (value) {
            case 'ac':
                this.clearAll();
                break;        
            case 'ce':
                this.calcelEntry();
                break;
            case 'soma':                
                break;                       
            case 'subtracao':
                break;
            case 'multiplicacao':
                break;
            case 'divisao':
                break; 
            case 'porcento':
                break;
            case 'igual':
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':                
            case '9':
                this.addOperatoration(parseInt(value)); 
                break;
            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents(){
        //pegando os botoes e numeros dos botoes
        let buttons =  document.querySelectorAll("#buttons > g, #parts > g");
        
        //listener pra quando algum botao for clicado
        //note que o listener ta escutando botao a botao com o foreach
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e =>{
                //usando o btn.className.baseVal pra ele pegar apenas o nome da classe
                //usando o replace pra tirar o btn- e colocar nada no lugar
                let textBtn = console.log(btn.className.baseVal.replace("btn-",""));

                this.execBtn(textBtn);
            });
            
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = "pointer";
            });
        });
    }    
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
        
    }
    set displayTime(value){
        return this._timeEl.innerHTML = value;
        
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        return this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){

        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}

//dir(document)
//seletores de id usasse HASHTAG #
//seletores de classe usa-se PONTO .