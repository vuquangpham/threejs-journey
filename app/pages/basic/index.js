import Page from '@/classes/Page';

export default class extends Page{
    constructor(){
        super({
            element: '[data-page]',
        });

        // init variable
        this.instance = null;
    }

    create(){
        super.create();

        // dynamic import
        this.id = this.element.getAttribute('data-page');

        // not lessons page
        if(!this.id) return;

        // create instance
        const instanceName = this.id;

        import(`./${instanceName}`)
            .then((instance) => {
                this.instance = new instance.default({
                    element: this.element,
                });
            });
    }

    destroy(){
        // destroy last instance
        if(this.instance){
            this.instance.destroy();
            this.instance = null;
        }
    }
}