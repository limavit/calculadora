class CalcControler{

    constructor(){
        
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        // o _ significa que é private
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initkeyboard();
        this.pasteFromClipboard();
        
    }
    copyToClipboard(){
        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();


    }

    pasteFromClipboard(){
        document.addEventListener('paste', e=>{
            let text  = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
            console.log(text);
        });


    }
    initialize(){
     //setinterval executa essa função de forma intermitente em um intervalo de tempo
     // em milisegundos
        this.setDisplayDateTime();
        let interval = setInterval(()=>{
            this.setDisplayDateTime();
            
        }, 1000);
        this.setLastNumberToDisplay();

        document.querySelectorAll('.btn-ac').forEach(btn => {
            btn.addEventListener('dbclick', e =>{
                this.toggleAudio();
            });
        });

        /* setTimeout(()=>{
            clearInterval(interval);
        }, 10000); 
        só pra testar o pause depois de 10 segundos
        tivemos que salvar o id do setInterval dentro da variavel interval
        */       
    }
    toggleAudio(){
        //esse merda aqui é um if, acredite se quiser
        this._audioOnOff = !this._audioOnOff;

    }

    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }
    initkeyboard(){
        document.addEventListener('keyup', e=>{
            this.playAudio();
            
                switch (e.key) {
                    case 'Escape':
                        this.clearAll();
                        break;        
                    case 'Backspace':
                        this.calcelEntry();
                        break;
                    case '+':                                         
                    case '-':                    
                    case '*':                    
                    case '/':                    
                    case '%':
                    this.addOperatoration(e.key); 
                        break;
                    case '=':
                    case 'Enter':
                    this.calc();
                        break;
                    case '.':
                    case ',':
                    this.addDot(); 
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
                        this.addOperatoration(parseInt(e.key)); 
                        break;
                    case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;

                }
            
        });
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
        this._lastNumber = '';
        this._lastOperator = ''
        this.setLastNumberToDisplay();

        //this.displayCalc = 0;
    }

    calcelEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
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
    getResult(){
        
        return eval(this._operation.join(""));
    }
    calc(){
        let last = '';
        this._lastOperator = this.getLastItem();
        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }
        if(this._operation.length > 3){
          last =  this._operation.pop();
          
          this._lastNumber = this.getResult();
        }
        else if(this._operation.length == 3){
          
          this._lastNumber = this.getResult(false);
        }
        
        
        let result = this.getResult();
        if(last == '%'){
            result /= 100;
            this._operation = [result];
        }else{
            
            this._operation = [result];
            if(last)this._operation.push(last);
            
        }
        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true){
        let lastItem;
        for (let index = this._operation.length - 1; index >= 0; index--) {
            if(this.isOperator(this._operation[index]) == isOperator){
                lastItem = this._operation[index];
                break;
            }
        }
        if(!lastItem)    {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);
        
        if(!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }
    addOperatoration(value){
        //console.log('A', value, isNaN(this.getLastOperation()));
        if(isNaN(this.getLastOperation())){
            //quando for string
            
            if(this.isOperator(value)){
                //trocar operador
                this.setLastOperation(value)
                
            }else{
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        }else{
            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                //se for number
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);

            this.setLastNumberToDisplay();
            }
            
            
        }
        //this._operation.push(value);
        //console.log(this._operation);
    }

    setError(){
        this.displayCalc = "Error";
    }
    
    addDot(){
        let lastOperarion = this.getLastOperation();
        if(typeof(lastOperarion) === 'string' && lastOperarion.split('').indexOf('') > -1) return;
        if(this.isOperator(lastOperarion) || !lastOperarion){
            this.pushOperation('0.');
        }else{
            this.setLastOperation(lastOperarion.toString() + '.');
        }
        this.setLastNumberToDisplay();

    }
    execBtn(value){
        this.playAudio();
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
            this.calc();
                break;
            case 'ponto':
            this.addDot(); 
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

        if(value.toString().length > 10){
            this.setError();
            return false;
        }
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