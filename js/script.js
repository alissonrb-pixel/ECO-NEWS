document.addEventListener('DOMContentLoaded', () => {
    /*Manipulação do menu*/
    const navMenu = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.getElementById('menu-btn');
    const menuIcon = menuBtn.querySelector('i');
    const crcl1Btn = document.getElementById('circle-1');
    const crcl1Icon = crcl1Btn.querySelector('i');
    const crcl2Btn = document.getElementById('circle-2');
    const crcl2Icon = crcl2Btn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        /*Lógica para alterar o icone*/
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.replace('ph-dots-three-outline-vertical', 'ph-x');
        }
        else {
            menuIcon.classList.replace('ph-x', 'ph-dots-three-outline-vertical');
        }
    })
    /**funções para o slider **/
    const slides = document.querySelectorAll('.carousel-slide');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const slide1 = document.getElementById('circle-1');
    const slide2 = document.getElementById('circle-2');
    /*Variaveis */
    let currentSlide = 0;
    let autoPlayTimer;
    //função para mostrar o slide atual (currentSlide)
    function showTargetSlide(index) {
        //inicialmente remove todos os slides ativos
        slides.forEach(slide => slide.classList.remove('active'));

        if (index >= slides.length) {
            currentSlide = 0;
        }
        else if (index < 0) {
            currentSlide = slides.length - 1;
        }
        else {
            currentSlide = index;
        }
        slides[currentSlide].classList.add('active');

        if (currentSlide == 0) {
            crcl1Icon.classList.replace('ph-thin', 'ph-fill');
            crcl2Icon.classList.replace('ph-fill', 'ph-thin');
        }
        else if (currentSlide == 1) {
            crcl2Icon.classList.replace('ph-thin', 'ph-fill');
            crcl1Icon.classList.replace('ph-fill', 'ph-thin');
        }

    }

    function runAutoPlay() {
        autoPlayTimer = setInterval(() => {
            showTargetSlide(currentSlide + 1)
        }, 6000)
    }


    //ação dos botões
    btnNext.addEventListener('click', () => {
        showTargetSlide(currentSlide + 1);
        resetAutoPlay();
    })

    btnPrev.addEventListener('click', () => {
        showTargetSlide(currentSlide - 1);
        resetAutoPlay();
    })

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        runAutoPlay();
    }

    slide1.addEventListener('click', () => {
        showTargetSlide(0);
        resetAutoPlay();

    })
    slide2.addEventListener('click', () => {
        showTargetSlide(1);
        resetAutoPlay();
    })
    //Dá a partida na trabsição dos slides
    runAutoPlay();

    //Inicio dos contadores 

    const counters = document.querySelectorAll('.stat-num');//Seleciona os itens estáticos (números)

    function runCounterAnimation(el) { //Função responsável por subir progressivamente a numeração

    

    const targetNumber = parseInt(el.getAttribute('data-target')); //pega o valor data-target
    const durationLimit = 2000; //tempo da animação em ml

    let counterValue=0; //Inicializa uma váriavel contador

    const incrementAmount= targetNumber/(durationLimit/20); // Aumenta a quantidade a cada 20 milisegundos

    const updateVisualsTimer = setInterval(()=>{
        //Adiciona o incremento no valor atual
        counterValue += incrementAmount;

        if (counterValue>=targetNumber){
            el.innerText = targetNumber; //Garante que não apareça nenhum número quqabrado
            clearInterval(updateVisualsTimer); //Interromper o setInterval;
        }
        else{
            el.innerText=Math.ceil(counterValue);
        }
    
    },20); //Cria um looping temporal a cada 20 milisegundos


}

//O observer que osberva os elementos
const scrollObserver = new IntersectionObserver((entries,observerInstance)=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting){ //Se observa algo
                runCounterAnimation(entry.target);
                observerInstance.unobserve(entry.target);
            }
        });
    },{
        threshold:0.6 //Pelo menos 60% do elementos tem que estar visivel
    });
    counters.forEach(counterItem=>{//Habilita o observer para cada entrada 
        scrollObserver.observe(counterItem);
    });

    //Dark Mode
    const darkModeBtn = document.getElementById('theme-toggle');
    const themeIcon = darkModeBtn.querySelector('i');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('ph-star-and-crescent', 'ph-sun-dim');
    }

    //Recupera o tema salvo anteriormente    const savedTheme = localStorage.getItem('theme');
    
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode'); //Liga ou desliga o modo escuro
        // Alterna o ícone do botão conforme o modo
        const isDark = document.body.classList.contains('dark-mode');
        if (isDark) {
            themeIcon.classList.replace('ph-star-and-crescent', 'ph-sun-dim');
            localStorage.setItem('theme', 'dark'); // Salva a preferência no localStorage
        }
        else {
            themeIcon.classList.replace('ph-sun-dim', 'ph-star-and-crescent');
            localStorage.setItem('theme', 'light'); // Salva a preferência no localStorage
        }
    })

});