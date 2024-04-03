window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('preloader').style.display = 'none';
        document.querySelector('.content').classList.remove('hidden');
        var elements = document.querySelectorAll('.fade-in');
        elements.forEach(function(element) {
            element.classList.add('fade-in-active');
        });
    }, 3000);
});

let form = document.querySelector('#form-register');
let progressOptions = document.querySelectorAll('.progressbar__option');
let transitioning = false;

form.addEventListener('click', function (e) {
    let element = e.target;
    let isButtonNext = element.classList.contains('step__button--next');
    let isButtonBack = element.classList.contains('step__button--back');
    if (isButtonNext || isButtonBack) {
        let currentStep = document.querySelector('.step.active');
        let nextStepId = isButtonNext ? parseInt(currentStep.id.split('-')[1]) + 1 : parseInt(currentStep.id.split('-')[1]) - 1;
        let nextStep = document.getElementById('step-' + nextStepId);

        if (transitioning) {
            return; // Si ya hay una transición en curso, no hacer nada
        }

        transitioning = true; // Indicar que hay una transición en curso

        currentStep.addEventListener('transitionend', function() {
            currentStep.classList.add('d-none');
            nextStep.classList.remove('slide-in-right');
            transitioning = false; // Restablecer el estado después de la transición
        });

        currentStep.classList.remove('active');
        currentStep.classList.add('slide-out-left');
        currentStep.classList.add('inactive');

        nextStep.classList.remove('slide-out-left');
        nextStep.classList.remove('inactive');
        nextStep.classList.add('active');
        nextStep.classList.add('slide-in-right');
        nextStep.classList.remove('d-none'); // Mostrar el siguiente paso

        progressOptions[nextStepId - 1].classList.add('active');

        if (isButtonNext) {
            currentStep.classList.add('to-left');
        } else {
            currentStep.classList.remove('to-left');
            progressOptions[nextStepId].classList.remove('active');
        }
    }
});

