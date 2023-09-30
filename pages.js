const {createPagesPrototype} = require("./utils/utils");
module.exports = createPagesPrototype([
    {
        title: 'Basics',
        base: 'basic',
        pages: [
            {
                title: 'Three Basic'
            },
            {
                title: 'Geometries'
            },
            {
                title: 'Texture'
            },
            {
                title: 'Material'
            },
            {
                title: '3D Text'
            }
        ]
    },
    {
        title: 'Classic Techniques',
        base: 'technique',
        pages: [
            {
                title: 'Shadows'
            },
            {
                title: 'Haunted House'
            },
            {
                title: 'Particles'
            },
            {
                title: 'Galaxy Generator'
            },
            {
                title: 'Scroll Based Animation'
            }
        ]
    },
    {
        title: 'Advanced Techniques',
        base: 'advanced',
        pages: [
            {
                title: 'Physics'
            },
            {
                title: 'Imported Models'
            },
            {
                title: 'Raycaster and Mouse events'
            },
            {
                title: 'Environment Map'
            }
        ]
    },
]);