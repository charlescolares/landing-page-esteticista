// Função para detecção de visibilidade e aplicação da animação
        const animateOnScroll = () => {
            // Seleciona todos os elementos com a classe de animação
            const elements = document.querySelectorAll('.fade-in-on-scroll');

            // Configuração do Intersection Observer
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // Verifica se o elemento está na área visível
                    if (entry.isIntersecting) {
                        // Adiciona a classe que dispara a animação (opacity: 1, transform: 0)
                        entry.target.classList.add('fade-in-visible');
                        
                        // Opcional: Adiciona um atraso baseado na classe `delay-xxx`
                        const delayClass = Array.from(entry.target.classList).find(cls => cls.startsWith('delay-'));
                        if (delayClass) {
                            const delayMs = parseInt(delayClass.split('-')[1]);
                            entry.target.style.transitionDelay = `${delayMs / 1000}s`;
                        }

                        // Para de observar o elemento após a animação ser aplicada
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                // A animação será disparada quando 10% do elemento estiver visível
                threshold: 0.1 
            });

            // Inicia a observação em cada elemento
            elements.forEach(element => {
                observer.observe(element);
            });
        };

        // Garante que o script rode após o carregamento completo da página
        window.onload = animateOnScroll;