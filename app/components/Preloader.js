import Component from "@/classes/Component";
import GSAP from "gsap";

export default class Preloader extends Component{
    constructor({
                    onPreloaded = () => {
                    }
                }){
        super({
            element: ".preloader",
            elements: {
                title: ".preloader__text",
                images: document.querySelectorAll("img")
            },
        });

        // element doesn't exist
        if(!this.element) return;

        // init progress
        this.progress = 0;
        this.imagesLength = this.elements.images ? this.elements.images.length : 0;

        // handle animation
        this.splitText();
        this.createLoader();

        // callback
        if(typeof onPreloaded === 'function'){
            this.onPreloaded = onPreloaded;
        }
    }

    createLoader(){
        // not images
        if(!this.imagesLength){
            this.onAssetLoaded(true);
            return;
        }

        this.elements.images.forEach(element => {
            element.onload = () => this.onAssetLoaded();
            element.src = element.getAttribute("data-src");
        });
    }

    onAssetLoaded(force = false){
        this.progress += 1;
        const percentage = this.progress / this.imagesLength;

        // image loaded
        if(percentage === 1 || force){
            this.onLoaded().then(() => {
                if(!this.onPreloaded) return;
                this.onPreloaded();
            });
        }
    }

    splitText(){
        const textContent = this.elements.title.textContent;
        this.elements.title.innerHTML = textContent.split(" ").map(t => `<span><span>${t}</span></span>`).join(" ");
    }

    onLoaded(){
        return new Promise(resolve => {
            const tl = GSAP.timeline({
                defaults: {
                    ease: "power1.in",
                }
            });
            tl.to(this.elements.title.querySelectorAll("span span"), {
                yPercent: 105
            }).to(this.element, {
                yPercent: 100,
                onComplete: () => {
                    resolve();
                }
            });
        });
    }

    destroy(){
        this.element.parentNode.removeChild(this.element);
    }

}
