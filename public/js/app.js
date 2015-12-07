(function () {

	self.Question = function(type,color,ask,optionsAnswers,id){
		this.type = type;
		this.color = color;
		this.ask = ask;
		this.optionsAnswers = optionsAnswers;
		this.id = id;
	}
})();
(function(){
	self.Answer = function(answer,correct){
	  	this.answer = answer;
	  	this.correct = correct;
	}
})();
(function(){
	  self.Trivia = function(){
	  	
	  }
})();
function main(){

}
var sound;
function play(){
    sound.stop().play();
}
function stop(){
    sound.stop();
}
var score = 0;
function backgroundScore(scores){
    if(scores==0){
        document.getElementById("score").src = "img/rolo.png";
    }
    if(scores>0 && scores<25){
        document.getElementById("score").src = "img/barrio.png";
    }
    if(scores>=25 && scores<50){
        document.getElementById("score").src = "img/culturizate.png";
    }
    if(scores>=50 && scores<75){
        document.getElementById("score").src = "img/pelo.png";
    }
    if(scores>=75){
        document.getElementById("score").src = "img/caleno.png";
    }
}

function next(){
	document.getElementById("home").style.display = "none";
	document.getElementById("start_game").style.display = "block";
}
function start(){
	document.getElementById("home").style.display = "none";
	document.getElementById("start_game").style.display = "none";
	document.getElementById("questions").style.display = "block";
	nextQuestion();
}
var index = 0;
var actualQuestion = 0;
function nextQuestion(){
	var q = Math.floor((Math.random()*questions.length));

    if(questions[q].sound){
        document.getElementById("song").style.display = "block";
        sound = new Howl({
          urls: ['sound/'+questions[q].url_sound]
        });
    }else{
        document.getElementById("song").style.display = "none";        
    }
	changeQuestion(questions[q].ask);
	changeBackground("img/"+questions[q].img);
	var answers = answerswithoutRepeating();
	var optionsAnswers = [];
	var ta = questions[q].option_a;
	var tb = questions[q].option_b;
	var tc = questions[q].option_c;
	var td = questions[q].option_d;
	optionsAnswers.push(ta);
	optionsAnswers.push(tb);
	optionsAnswers.push(tc);
	optionsAnswers.push(td);
	changeTxtOptions(optionsAnswers[answers[0]],optionsAnswers[answers[1]],optionsAnswers[answers[2]],optionsAnswers[answers[3]]);
	var color_options = color(questions[q].color);
	changeImgOptions(color_options[0],color_options[1],color_options[0],color_options[1]);
	actualQuestion = q;
	index++;
}
 function answerswithoutRepeating(){
        var answers = [];
        var  a = Math.floor((Math.random()*5));
        var answerA =  a;
        if(answerA==4){
            answerA=3;
        }
        var answerB = 0;
        var answerC = 0;
        var answerD = 0;

        if(answerA==0){
            answerB=1;
            answerC=2;
            answerD=3;
        }
        if(answerA==1){
            answerB=2;
            answerC=3;
            answerD=0;
        }
        if(answerA==2){
            answerB=3;
            answerC=0;
            answerD=1;
        }
        if(answerA==3){
            answerB=0;
            answerC=1;
            answerD=2;
        }

        answers[0] = answerA;
        answers[1] = answerB;
        answers[2] = answerC;
        answers[3] = answerD;

        return answers;
}
function color(color){
	var options = [];
	switch(color){
		case "rojo":
			options.push("img/aRojo.png");
			options.push("img/bRojo.png");
		break;
		case "verde":
			options.push("img/aVerde.png");
		 	options.push("img/bVerde.png");
		 break;
		case "naranja":
			options.push("img/aNaranja.png");
		 	options.push("img/bNaranja.png");
		break;
		case "amarillo":
			options.push("img/aAmarillo.png");
		 	options.push("img/bAmarillo.png");
		break;
		case "oro":
			options.push("img/aOro.png");
		 	options.push("img/bOro.png");
		break;
			case "azul":
			options.push("img/aAzul.png");
		 	options.push("img/bAzul.png");
		break;
		case "rosa":
			options.push("img/aRosa.png");
		 	options.push("img/bRosa.png");
		break;

	}
	return options;
}
function changeBackground(background_ask){
	document.getElementById("background").src = background_ask;
}
function changeQuestion(question){
	document.getElementById("text_question").innerHTML = question;
}
function changeTxtOptions(ta,tb,tc,td){
	document.getElementById("txt_option_a").innerHTML  = ta;
	document.getElementById("txt_option_b").innerHTML  = tb;
	document.getElementById("txt_option_c").innerHTML  = tc;
	document.getElementById("txt_option_d").innerHTML  = td;
}
function changeImgOptions(ia,ib,ic,id){
	document.getElementById("img_option_a").src = ia;
	document.getElementById("img_option_b").src = ib;
	document.getElementById("img_option_c").src = ic;
	document.getElementById("img_option_d").src = id;
}
function feedback(answer) {
	var answerCorrect = questions[actualQuestion].option_a;
		if(answer === answerCorrect){
			score++;
			document.getElementById("questions").style.display = "none";
			document.getElementById("good-feedback").style.display = "block";
		}else{
			document.getElementById("questions").style.display = "none";
			document.getElementById("bad-feedback").style.display = "block";
			document.getElementById("text_feedback").innerHTML = questions[actualQuestion].feedback;
		}
}
function goodFeedback(){
	if(index <5 ){
		nextQuestion();
		document.getElementById("questions").style.display = "block";
		document.getElementById("good-feedback").style.display = "none";
	}else{
		document.getElementById("score-game").style.display = "block";
		document.getElementById("questions").style.display = "none";
		document.getElementById("bad-feedback").style.display = "none";	
		document.getElementById("good-feedback").style.display = "none";	
  		var totalScore = (score/5)*100;
		backgroundScore(totalScore);
  		
  	}
}
function badFeedback(){
	if(index <5 ){
		nextQuestion();
		document.getElementById("questions").style.display = "block";
		document.getElementById("bad-feedback").style.display = "none";
  	}else{
  		document.getElementById("score-game").style.display = "block";
		document.getElementById("questions").style.display = "none";
		document.getElementById("bad-feedback").style.display = "none";	
		document.getElementById("good-feedback").style.display = "none";
		var totalScore = (score/5)*100;
		backgroundScore(totalScore);	
  }
}
function newGame(){
	document.getElementById("home").style.display = "block";
	document.getElementById("score-game").style.display = "none";
	index = 0;
	actualQuestion = 0;
	score = 0;
}
function optionA(){
	var option_a = document.getElementById("txt_option_a").innerHTML;;
	feedback(option_a);
}
function optionB(){
	var option_b = document.getElementById("txt_option_b").innerHTML;;
	feedback(option_b);	
}
function optionC(){
	var option_c = document.getElementById("txt_option_c").innerHTML;;
	feedback(option_c);
}
function optionD(){
	var option_d = document.getElementById("txt_option_d").innerHTML;;
	feedback(option_d);
}
 var questions = [{
                id: "1",
                type:"Fiambre",
                sound: false,
                img: "cholado.png",
                ask:"Mirá panita, llegamos a las canchas Panamericanas vé. Te voy a invitar a un cholao.\n" +
                "¿Vos de qué crees que está hecha esta vaina?\n",
                option_a: "Hielo, frutas, salsas, leche condensada",
                option_b:"Hielo, queso, helado, coco",
                option_c:"Hielo, ripio de papa, arroz",
                option_d:"Hielo, lulo, maiz, piña",
                feedback: "El Cholado es un raspado de hielo, típico del departamento del Valle Del Cauca. Tiene base de frutas, jarabes de diferentes sabores y leche condesada.",
                color:"verde"
        },
        {
                id : "2",
                type :"Fiambre",
                sound: false,
                img: "empanada.png",
                ask : "Llavecita vámonos pa’ la fritanga de Doña Rosario, vení y te invito a una empanada. \n" +
                "¿Con qué será que bajamos esto?\n",
                option_a : "Champus",
                option_b : "Gaseosa",
                option_c : "Agua",
                option_d : "Jugo",
                feedback : "En la ciudad de Cali, la mayoría de su población tradicional acompaña las empanadas con champus la cual es una bebida típica elaborada con maíz y lulo.",
                color : "rojo"

        },
        {
                id:"3",
                type:"Fiambre",
                sound: true,
                url_sound: "mazamorra.wav",
                img:"mazamorra.png",
                ask:"¡Uy, escuchá eso! Por ahí viene el de…",
                option_a:"La Manzamora y champus",
                option_b:"La Lulada",
                option_c:"Los Helados",
                option_d:"El Ponche",
                feedback:"En la mayoría de los barrios de Cali, es común ver a una persona en un triciclo presionando una bocina con ese sonido y vendiendo mazamorra y champus.",
                color:"naranja"

        },
        {
                id:"4",
                type:"Fiambre",
                sound: false,
                img:"napa.png",
                ask:"¡Uy no! Esa empanda me quedó en un diente, pidamosle a Doña Rosario…",
                option_a:"La ñapa",
                option_b:"Una más",
                option_c:"Otrica",
                option_d:"Jugo",
                feedback:"La comunidad caleña suele utilizar la palabra “ñapa” para pedir más de algo.",
                color:"amarillo"
        },
        {
                id:"5",
                type:"Fiambre",
                sound: false,
                img:"",
                ask:"Amigazo, vos que crees que cuál de estas vainas es un pandebono.",
                option_a:"Imagen",
                option_b:"Imagen",
                option_c:"Imagen",
                option_d:"Imagen",
                feedback:"El pandebono es un panecillo característico del Valle del Cauca, elaborado con harina de maíz, queso y huevo. Se utiliza para acompañar meriendas o desayunos.",
                color:"rojo"
        }
        //-------------------------------------------------------------------------------------------
        // Guaguanco
        //-------------------------------------------------------------------------------------------
        ,{
                id:"6",
                type:"Guaguanco",
                sound: true,
                url_sound: "vea.wav",
                img:"oiga.png",
                ask:"Panita cómo se llama este tema, ‘Oilo’.",
                option_a:"Oiga mire vea",
                option_b:"Las caleñas son como las flores",
                option_c:"Cali pachanguero",
                option_d:"Cali",
                feedback:"Canción de Salsa, interpretada por el grupo niche.",
                color:"rosa"
        },
        {
                id:"7",
                type:"Guaguanco",
                sound: false,
                img:"radio.png",
                ask:"Ve bacán, escuchá la canción que está sonando en la radio: “¡Del puente para allá es ________, del puente para acá está Cali!”",
                option_a:"Juanchito",
                option_b:"Menga",
                option_c:"La 66",
                option_d:"La Sexta",
                feedback:"Esta canción hace parte de la tradición caleña y es uno de los más grandes éxitos del grupo.",
                color:"verde"
        },
        {
                id:"8",
                type:"Guaguanco",
                sound: false,
                img:"calenas.png",
                ask:"Mirá esa vieja Ve, es que definitivamente las caleñas son como:",
                option_a:"Las flores",
                option_b:"Modelos",
                option_c:"Rusas",
                option_d:"El cielo",
                feedback:"Las caleñas son como las flores es uno de los mas grandes éxitos de PiPe Pimienta, cantante de música tropical y salsa en la década de los 70’s.",
                color:"oro"
        },
        {
                id:"9",
                type:"Guaguanco",
                sound: false,
                img:"salsa.png",
                ask:"¿Sabes qué? vámonos azotar baldosa al ritmo de:",
                option_a:"La Salsa",
                option_b:"Reguetton",
                option_c:"Merengue",
                option_d:"Las Baladas",
                feedback:"La salsa baile represetativo de la sucursal del cielo",
                color:"rojo"
        }
        //-------------------------------------------------------------------------------------------
        // Pa pegarnos el borondo
        //-------------------------------------------------------------------------------------------
        ,{
                id:"10",
                type:"Pa pegarnos el borondo",
                sound: false,
                img:"pance.png",
                ask:"Si te vas a quedar hasta el domingo, te invito a que tiremos nado en:",
                option_a:"El Río Pance",
                option_b:"El Río Melendez",
                option_c:"El polideportivo",
                option_d:"El club campestre",
                feedback:"Es tradición en Cali ir los domingos al Río en Pance para pasar un rato en familia y cocinar un rico sancocho.",
                color:"amarillo"
        },
        {
                id:"11",
                type:"Pa pegarnos el borondo",
                sound: false,
                img:"tresCruces.png",
                ask:"Ve te veo como gordo, deberíamos de ir mañana a quemar esas empanaditas a:",
                option_a:"Cerro de las tres cruces",
                option_b:"Canchas panamericanas",
                option_c:"Gimnasio",
                option_d:"Club campestre",
                feedback:"Uno de los sitios preferidos de los Caleños para hacer ejercicio es el Cerro de la tres cruces, ubicado en el barrio Normandía en el oeste de la ciudad.",
                color:"rosa"
        },
        {
                id:"12",
                type:"Pa pegarnos el borondo",
                sound: false,
                img:"cuenteros.png",
                ask:"Pelao estás como achantado, vamos a tirar caja escuchando a los cuenteros en:",
                option_a:"San Antonio",
                option_b:"Parque de la Caña",
                option_c:"Parque de Jovita Feijoo",
                option_d:"La estatua de Sebastián de Belalcazar",
                feedback:"En el barrio San Antonio se encuentra una de las iglesias más históricas de la ciudad, aquí se reúnen personas a contar historias o cuentos que hacen reír.",
                color:"oro"
        },
        {
                id:"13",
                type:"Pa pegarnos el borondo",
                sound: false,
                img:"ermita.png",
                ask:"Tengo ganas de salir a darme un borondo, camina pal Bulevar del Río y de paso te presento:",
                option_a:"La iglesia la Ermita",
                option_b:"La iglesia la Merced",
                option_c:"La plaza de Toros",
                option_d:"Estación del Ferrocarril",
                feedback:"El bulevar del río es un sendero peatonal, al margen del río Cali, que recorre varios sitios turísticos como la Ermita y el Gato de Tejada.",
                color:"verde"
        }
        //-------------------------------------------------------------------------------------------
        // Cultura
        //-------------------------------------------------------------------------------------------
        ,{
                id:"14",
                type:"Cultura",
                sound: false,
                img:"feria.png",
                ask:"Parcerito, vos me caíste muy bien, te invito a que vengas el 25 de diciembre para que disfrutemos de:",
                option_a:"La Feria de Cali",
                option_b:"El Festival Mundial de Salsa",
                option_c:"La Feria de las Flores",
                option_d:"El Petronio Alvares",
                feedback:"A partir del 25 de diciembre, en Cali se celebra su fiesta más popular, la Feria de Cali, 5 días de fiesta y homenajes a la cultura caleña.",
                color:"rojo"
        },
        {
                id:"15",
                type:"Cultura",
                sound: false,
                img:"alumbrado.png",
                ask:"Panita, si vas a volver por estos lados en diciembre me avisás para que vayamos al Bulevar del Río y veas lo bonito que es:",
                option_a:"El Alumbrado de Cali",
                option_b:"El Río Cali",
                option_c:"La plaza de Caicedo",
                option_d:"La Rueda",
                feedback:"A partir del 7 de diciembre hasta principios de enero, se exhibe en el Bulevar del Río el alumbrado navideño de la ciudad el cual es visitado por muchos habitantes y visitantes."
                ,color:"azul"
        },
        {
                id:"16",
                type:"Cultura",
                sound: false,
                img:"macetas.png",
                ask:"Panita, ¿Vos no tenés ahijados? Aquí en Cali le podés dar el mejor regalo, comprale unas:",
                option_a:"Macetas",
                option_b:"Almojabanas",
                option_c:"Canicas",
                option_d:"Lamparas",
                feedback:"En Cali es costumbre celebrar el día de los ahijados regalando unas deliciosas macetas la cual es un arreglo de figuras de azúcar adornadas de papelillos de colores.",
                color:"naranja"
        },
        {
                id:"17",
                type:"Cultura",
                sound: false,
                img:"cometa.png",
                ask:"¿Sabés que me encantaba hacer cuando pequeño? Ir a volar cometa al parque del Ingenio, si querés probar pegate otro borondo por Cali en el mes de:",
                option_a:"Agosto",
                option_b:"Marzo",
                option_c:"Diciembre",
                option_d:"Junio",
                feedback:"Durante el mes de agosto, los parques de Cali se llenan de gente para elevar cometas de todo tipo y estilo.",
                color:"amarillo"
        }
        //-------------------------------------------------------------------------------------------
        // Palabras tipicas
        //-------------------------------------------------------------------------------------------
        ,{
                id:"18",
                type:"Palabras tipicas",
                sound: false,
                img:"palabras.png",
                ask:"Mirá, la gente a veces me dice que los caleños hablamos muy raro vé, ¿Vos si me entendes si te digo que pidas una ‘chuspa’?",
                option_a:"Bolsa",
                option_b:"Caja",
                option_c:"Flor",
                option_d:"Mujer",
                feedback:"Cali es la única ciudad del mundo que le dice ‘chuspa’ a una bolsa de plástico. Una tradición un poco rara.",
                color:"oro"
        },
        {
                id:"19",
                type:"Palabras tipicas",
                sound: false,
                img:"palabras.png",
                ask:"Mirá, la gente a veces me dice que los caleños hablamos muy raro vé, ¿Vos si me entendes si te digo que vayamos por el ‘fiambre’?",
                option_a:"La comida",
                option_b:"Un arma de fuego",
                option_c:"Un alambre",
                option_d:"Un ave exótica de la región",
                feedback:"La expresión ‘fiambre’ es una forma muy popular en la ciudad para referirse a la comida.",
                color:"oro"
        },
        {
                id:"20",
                type:"Palabras tipicas",
                sound: false,
                img:"palabras.png",
                ask:"Panita, por ahí dicen la malas lenguas que en Cali todos somos ‘melómanos’, ¡Y la verdad es que sí! ¿Vos si sabes de qué te estoy hablando?",
                option_a:"Fanáticos de la salsa y la música",
                option_b:"Fanáticos del fútbol",
                option_c:"Fanáticos del ajedrez",
                option_d:"Fanáticos del ballet",
                feedback:"El melómano es aquél que siente extrema pasión por la música. En Cali lo hacemos por la salsa.",
                color:"oro"
        },
        {
                id:"21",
                type:"Palabras tipicas",
                sound: false,
                img:"palabras.png",
                ask:"Vos a mí me caíste muy bien vé, de ahora en adelante vamos a ser panitas, ¿Si me entendés?",
                option_a:"Amigos",
                option_b:"Familiares",
                option_c:"Conocidos",
                option_d:"Enemigos",
                feedback:"En Cali se le suele llamar parce, pana o llave a los amigos.",
                color:"oro"
        }]
