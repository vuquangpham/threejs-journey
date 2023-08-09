import Page from '@/classes/Page';
import '@/vendors/position/Position.min';
import '@/vendors/smooth/smoothjs.min';

export default class Home extends Page{
    constructor(){
        super({
            id: 'home',
            element: '[data-template]',
        });

        // create cursor animation
        this.cursorAnimation();
    }

    cursorAnimation(){
        // element
        const siteBannerEl = document.querySelector('.site-banner');

        // position variable
        const position = {
            x: siteBannerEl.clientWidth * 0.5,
            y: siteBannerEl.clientHeight * 0.5
        };

        // mouse position
        const mousePosition = {x: position.x, y: position.y};

        // register Position
        Position.create({
            target: siteBannerEl,
            onUpdate: (self) => {
                mousePosition.x = self.targetPosition.x;
                mousePosition.y = self.targetPosition.y;
            }
        });

        // register smooth animation
        Smooth.smooth({
            timing: 'lerp',
            onUpdate: (self) => {
                position.x = self.lerp(position.x, mousePosition.x, 0.03);
                position.y = self.lerp(position.y, mousePosition.y, 0.03);

                // change variables
                siteBannerEl.style.setProperty('--xPercent', position.x + 'px');
                siteBannerEl.style.setProperty('--yPercent', position.y + 'px');
            }
        });
    }
}