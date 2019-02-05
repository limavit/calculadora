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

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){

        return (['+', '-', '/', '*', '%'].indexOf(value) > -1);

    }
    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3){
            
            this.calc();
            
        }
    }
    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
        this.setLastNumbeToDisplay();
    }
    setLastNumbeToDisplay(){

        let lastNumber;
        for (let index = this._operation.length - 1; index >= 0; index--) {
            if(!this.isOperator(this._operation[index])){
                lastNumber = this._operation[index];
                break;
            }            
        }
        this.displayCalc = lastNumber;
    }
    addOperatoration(value){
        //console.log('A', value, isNaN(this.getLastOperation()));
        if(isNaN(this.getLastOperation())){
            //quando for string
            
            if(this.isOperator(value)){
                //trocar operador
                this.setLastOperation(value)
                
            }else if(isNaN(value)){
                
                //outra coisa
                console.log('outra coisa', value);
            }else{
                this.pushOperation(value);
                this.setLastNumbeToDisplay();
            }
        }else{
            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                //se for number
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));

            this.setLastNumbeToDisplay();
            }
            
            
        }
        //this._operation.push(value);
        //console.log(this._operation);
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
            this.addOperatoration('+');                
                break;                       
            case 'subtracao':
            this.addOperatoration('-'); 
                break;
            case 'multiplicacao':
            this.addOperatoration('*'); 
                break;
            case 'divisao':
            this.addOperatoration('/'); 
                break; 
            case 'porcento':
            this.addOperatoration('%'); 
                break;
            case 'igual':
                break;
            case 'ponto':
            this.addOperatoration('.'); 
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
                let textBtn = btn.className.baseVal.replace("btn-","");

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