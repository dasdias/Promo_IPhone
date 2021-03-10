document.addEventListener('DOMContentLoaded', function(){
    'use strict';

    const tabs = () => {
        const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitleElem = document.querySelector('.card-details__title');
        const cardImageItemElem = document.querySelector('.card__image_item');
        const cardDetailsPriceElem = document.querySelector('.card-details__price');
        const descriptionMemoryElem = document.querySelector('.description__memory');

        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 64GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 95000,
                memoryROM: 64
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
                img: 'img/iPhone-silver.png',
                price: 120990,
                memoryROM: 128
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 99990,
                memoryROM: 256
            }
        ];

        const deactive = () => {
            cardDetailChangeElems.forEach( btn => btn.classList.remove('active') );
        };

        cardDetailChangeElems.forEach( (btn, i) => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active')) {
                    deactive();
                    btn.classList.add('active');

                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItemElem.src = data[i].img;
                    cardImageItemElem.alt = data[i].name;
                    cardDetailsPriceElem.textContent = data[i].price + '₽';
                    descriptionMemoryElem.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`
                    
                }
            });
        })

  

    }

    const accordion = () => {
        const characteristicsItemElems = document.querySelectorAll('.characteristics__item');
        const characteristicsListElem = document.querySelector('.characteristics__list');

        const open = (button, dropDown) => {
            closeAllDrops(button, dropDown)
            dropDown.style.height = `${dropDown.scrollHeight}px`
            button.classList.add('active');
            dropDown.classList.add('active');
        }

        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height ='';
        }

        const closeAllDrops = (button, dropDown) => {
            characteristicsItemElems.forEach( (elem) =>{
                if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                    close(elem.children[0], elem.children[1]);
                }
            })
        }

        characteristicsListElem.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item')
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ? close( target, description) : open( target, description);
            } 
        })
        document.body.addEventListener('click', (e) =>{
            const target = e.target;
            if (!target.classList.contains('characteristics__title')) {
                closeAllDrops();
            }
        })
    }

    const modal = () => {
        const allButton = document.querySelectorAll('.button');
        // const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const modal = document.querySelector('.modal');
        const modalTitle = document.querySelector('.modal__title');
        const modalSubtitle = document.querySelector('.modal__subtitle');
        
        allButton.forEach( (btn) => {
            
            btn.addEventListener('click', (event) => {
                const cardDetailsTitle = document.querySelector('.card-details__title').textContent;
                const target = event.target;
                modalTitle.textContent = cardDetailsTitle;
                modalSubtitle.textContent = target.dataset.btn;
                modal.classList.add('open')
            });
        
        })
        document.addEventListener('keydown', (event) => {
            const keyEsc = event.code;
            if (keyEsc === 'Escape') {
                modal.classList.remove('open');
            }
        })
        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('modal__close')) {
                modal.classList.remove('open');
            } else if (target.classList.contains('modal')) {
                modal.classList.remove('open');
            }
        })
    }

    accordion();
    tabs();
    modal();
})