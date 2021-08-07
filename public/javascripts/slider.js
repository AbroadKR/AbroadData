const showing = 'showing';
const imageBox = document.querySelector('.section1_sliding_banner');
const images = document.querySelectorAll('.sliding_image');
const firstImage = document.querySelector('.sliding_image:first-child')

window.onload = slide;

function slide() {
    firstImage.classList.add(showing);
    setInterval(() => {
        const currentImage = document.querySelector(`.${showing}`);
        if (currentImage){
            currentImage.classList.remove(showing);
            const nextImage = currentImage.nextElementSibling;
            if(nextImage){
                nextImage.classList.add(showing);
            } else {
                firstImage.classList.add(showing);
            }
        } else {
            firstImage.classList.add(showing);
        }
    }, 7000);
}