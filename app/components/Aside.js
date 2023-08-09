import Component from "@/classes/Component";

/**
 * Aside component
 * */
export default class Aside extends Component{
    constructor(){
        super({element: '[data-aside]'});

        this.element.addEventListener('click', this.toggleActiveClass.bind(this));
    }

    toggleActiveClass(e){
        const target = e.target.closest('a.site-sidebar__child-item');
        if(!target) return;

        const currentActiveLink = this.element.querySelector('a.site-sidebar__child-item.active');

        // same link => do nothing
        if(currentActiveLink && currentActiveLink.isEqualNode(target)) return;

        // change active class
        currentActiveLink?.classList.remove('active');
        target.classList.add('active');
    }
}