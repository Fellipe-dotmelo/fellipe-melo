    // Seleciona todos os sliders
    const sliders = document.querySelectorAll('.slider');

    // Itera sobre cada slider
    sliders.forEach(slider => {
      // Inicializa o índice do slide atual como 0
      let slideIndex = 0;
      // Exibe o slide inicial
      showSlide(slider, slideIndex);

      // Seleciona os botões de navegação
      const prevBtn = slider.parentElement.querySelector('.prev');
      const nextBtn = slider.parentElement.querySelector('.next');

      // Adiciona ouvintes de eventos para os botões de navegação
      prevBtn.addEventListener('click', () => {
        // Exibe o slide anterior
        showSlide(slider, slideIndex -= 1);
      });

      nextBtn.addEventListener('click', () => {
        // Exibe o próximo slide
        showSlide(slider, slideIndex += 1);
      });

      // Adiciona ouvintes de eventos de toque
      slider.addEventListener('touchstart', handleTouchStart, false);
      slider.addEventListener('touchmove', handleTouchMove, false);
    });

    // Função para exibir o slide atual
    function showSlide(slider, n) {
      // Seleciona todas as imagens dentro do slider
      const slides = slider.querySelectorAll('img');
      // Obtém o número total de slides
      const totalSlides = slides.length;

      // Ajusta o índice do slide para garantir que esteja dentro dos limites
      slideIndex = (n + totalSlides) % totalSlides;

      // Oculta todas as imagens
      slides.forEach(slide => {
        slide.style.display = 'none';
      });

      // Exibe o slide atual
      slides[slideIndex].style.display = 'block';
    }

    // Variáveis para rastrear a posição inicial do toque
    let startX = 0;

    // Manipulador de evento para toque começando
    function handleTouchStart(event) {
      const firstTouch = event.touches[0];
      startX = firstTouch.clientX;
    }

    // Manipulador de evento para toque movendo
    function handleTouchMove(event) {
      const x = event.touches[0].clientX;
      const deltaX = startX - x;

      // Se o movimento for principalmente horizontal, ajuste o slide
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Movimento para a esquerda, exibe o próximo slide
          showNextSlide(event.target.parentElement);
        } else {
          // Movimento para a direita, exibe o slide anterior
          showPrevSlide(event.target.parentElement);
        }
      }

      // Reseta a posição inicial do toque
      startX = 0;
    }

    // Função para exibir o próximo slide
    function showNextSlide(slider) {
      showSlide(slider, slideIndex + 1);
    }

    // Função para exibir o slide anterior
    function showPrevSlide(slider) {
      showSlide(slider, slideIndex - 1);
    }