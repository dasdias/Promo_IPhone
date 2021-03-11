document.addEventListener('DOMContentLoaded', function(){
    'use strict';

    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url)
        request.addEventListener('readystatechange', () =>{
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                callback(response);
            } else {
                console.error(new Error('Ошибка: ' + request.status));
            }
        });
        request.send();
    };
   

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

    const modal = (event) => {
        // const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
        const modal = document.querySelector('.modal');
        const modalTitle = document.querySelector('.modal__title');
        const modalSubtitle = document.querySelector('.modal__subtitle');
        const modalGoods = document.querySelector('.modal_goods');
        const allButton = document.querySelectorAll('.button');

        const openModal = () => {
            document.addEventListener('keydown', escapeHandler);
            modal.classList.add('open')
        }
        const closeModal = () => {
            modal.classList.remove('open');
            document.removeEventListener('keydown', escapeHandler);
        }
        const escapeHandler = event  => {
            const keyEsc = event.code;
            if (keyEsc === 'Escape') {
                closeModal()
            }
        }

        allButton.forEach( (btn) => {
            
            btn.addEventListener('click', (event) => {
                const cardDetailsTitle = document.querySelector('.card-details__title').textContent;
                const target = event.target;
                const goods = target.closest('.cross-sell__item');
                if (goods) {
                    const crossSellTitle = goods.querySelector('.cross-sell__title');
                    modalGoods.value =  crossSellTitle.textContent;
                    modalTitle.textContent =  crossSellTitle.textContent;
                    
                } else {
                    modalGoods.value =  cardDetailsTitle;
                    modalTitle.textContent =  cardDetailsTitle;
                }
                modalSubtitle.textContent = target.dataset.btn;

                openModal();
            });
        
        })
    
        // Закрываем по Esc
        
        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('modal__close')) {
                closeModal()
            } else if (target.classList.contains('modal')) {
                closeModal()
            }
        })
        cardDetailsButtonDelivery.addEventListener('click', openModal )
    }

    const renderCrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list');
        
        const createCrossSellItem = (good) => {
            const liItem = document.createElement('li');
            liItem.innerHTML = `
            <article class="cross-sell__item">
                <img class="cross-sell__image" src="${good.photo}" alt="${good.name}">
                <h3 class="cross-sell__title">${good.name}</h3>
                <p class="cross-sell__price">${good.price}</p>
                <button type="button" data-btn="Оплата" class="button button_buy cross-sell__button">Купить</button>
            </article>
            `;
            return liItem;
        }

        const createCrossSellList = (goods) => {
            goods.forEach( item => {
                crossSellList.append(createCrossSellItem(item))
                modal()
            });
        };
        getData('./cross-sell-dbase/dbase.json', createCrossSellList);
    }

    accordion();
    tabs();
    modal();
    renderCrossSell();
})