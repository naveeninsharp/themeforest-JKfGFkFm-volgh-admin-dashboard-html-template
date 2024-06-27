const pickrContainer = document.querySelector('.pickr-container');
const themeContainer = document.querySelector('.theme-container');
const pickrContainer1 = document.querySelector('.pickr-container1');
const themeContainer1 = document.querySelector('.theme-container1');
const pickrContainer2 = document.querySelector('.pickr-container2');
const themeContainer2 = document.querySelector('.theme-container2');

// CLASSIC
const themes = [
    [
        'classic',
        {
            swatches: [
                'rgba(94, 45, 216, 1)',
                'rgba(212, 63, 141, 0.95)',
                'rgba(9, 173, 149, 0.9)',
                'rgba(7, 116, 248, 0.85)',
                'rgba(247, 183, 49, 0.8)',
                'rgba(248, 38, 73, 0.75)',
                'rgba(101, 116, 205, 0.7)',
                'rgba(0, 188, 212, 0.7)',
                'rgba(0, 150, 136, 0.75)',
                'rgba(76, 175, 80, 0.8)',
                'rgba(139, 195, 74, 0.85)',
                'rgba(205, 220, 57, 0.9)',
                'rgba(255, 235, 59, 0.95)',
                'rgba(255, 193, 7, 1)'
            ],

            components: {
                preview: true,
                opacity: true,
                hue: true,

                interaction: {
                    hex: true,
                    rgba: true,
                    hsva: true,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        }
    ],
];

const buttons = [];
let pickr = null;

for (const [theme, config] of themes) {
    const button = document.createElement('button');
    button.innerHTML = theme;
    buttons.push(button);

    button.addEventListener('click', () => {
        const el = document.createElement('p');
        pickrContainer.appendChild(el);

        // Delete previous instance
        if (pickr) {
            pickr.destroyAndRemove();
        }

        // Apply active class
        for (const btn of buttons) {
            btn.classList[btn === button ? 'add' : 'remove']('active');
        }

        // Create fresh instance
        pickr = new Pickr(Object.assign({
            el,
            theme,
            default: '#5e2dd8'
        }, config));

        // Set events
        pickr.on('init', instance => {
            console.log('Event: "init"', instance);
        }).on('hide', instance => {
            console.log('Event: "hide"', instance);
        }).on('show', (color, instance) => {
            console.log('Event: "show"', color, instance);
        }).on('save', (color, instance) => {
            console.log('Event: "save"', color, instance);
        }).on('clear', instance => {
            console.log('Event: "clear"', instance);
        }).on('change', (color, source, instance) => {
            console.log('Event: "change"', color, source, instance);
        }).on('changestop', (source, instance) => {
            console.log('Event: "changestop"', source, instance);
        }).on('cancel', instance => {
            console.log('cancel', pickr.getColor().toRGBA().toString(0));
        }).on('swatchselect', (color, instance) => {
            console.log('Event: "swatchselect"', color, instance);
        });
    });

    themeContainer.appendChild(button);
}

buttons[0].click();

// MONOLITH
const monolithThemes = [
    [
        'monolith',
        {
            swatches: [
                'rgba(94, 45, 216, 1)',
                'rgba(212, 63, 141, 0.95)',
                'rgba(9, 173, 149, 0.9)',
                'rgba(7, 116, 248, 0.85)',
                'rgba(247, 183, 49, 0.8)',
                'rgba(248, 38, 73, 0.75)',
                'rgba(101, 116, 205, 0.7)'
            ],

            defaultRepresentation: 'HEXA',
            components: {
                preview: true,
                opacity: true,
                hue: true,

                interaction: {
                    hex: false,
                    rgba: false,
                    hsva: false,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        }
    ]
];

const monolithButtons = [];
let monolithPickr = null;

for (const [theme, config] of monolithThemes) {
    const button = document.createElement('button');
    button.innerHTML = theme;
    monolithButtons.push(button);

    button.addEventListener('click', () => {
        const el = document.createElement('p');
        pickrContainer1.appendChild(el);

        // Delete previous instance
        if (monolithPickr) {
            monolithPickr.destroyAndRemove();
        }

        // Apply active class
        for (const btn of monolithButtons) {
            btn.classList[btn === button ? 'add' : 'remove']('active');
        }

        // Create fresh instance
        monolithPickr = new Pickr(Object.assign({
            el,
            theme,
            default: '#d43f8d'
        }, config));

        // Set events
        monolithPickr.on('init', instance => {
            console.log('Event: "init"', instance);
        }).on('hide', instance => {
            console.log('Event: "hide"', instance);
        }).on('show', (color, instance) => {
            console.log('Event: "show"', color, instance);
        }).on('save', (color, instance) => {
            console.log('Event: "save"', color, instance);
        }).on('clear', instance => {
            console.log('Event: "clear"', instance);
        }).on('change', (color, source, instance) => {
            console.log('Event: "change"', color, source, instance);
        }).on('changestop', (source, instance) => {
            console.log('Event: "changestop"', source, instance);
        }).on('cancel', instance => {
            console.log('cancel', monolithPickr.getColor().toRGBA().toString(0));
        }).on('swatchselect', (color, instance) => {
            console.log('Event: "swatchselect"', color, instance);
        });
    });

    themeContainer1.appendChild(button);
}

monolithButtons[0].click();

// NANO
const nanoThemes = [
    [
        'nano',
        {
            swatches: [
                'rgba(94, 45, 216, 1)',
                'rgba(212, 63, 141, 0.95)',
                'rgba(156, 39, 176, 0.9)',
                'rgba(103, 58, 183, 0.85)',
                'rgba(247, 183, 49, 0.8)',
                'rgba(248, 38, 73, 0.75)',
                'rgba(101, 116, 205, 0.7)'
            ],

            defaultRepresentation: 'HEXA',
            components: {
                preview: true,
                opacity: true,
                hue: true,

                interaction: {
                    hex: false,
                    rgba: false,
                    hsva: false,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        }
    ]
];

const nanoButtons = [];
let nanoPickr = null;

for (const [theme, config] of nanoThemes) {
    const button = document.createElement('button');
    button.innerHTML = theme;
    nanoButtons.push(button);

    button.addEventListener('click', () => {
        const el = document.createElement('p');
        pickrContainer2.appendChild(el);

        // Delete previous instance
        if (nanoPickr) {
            nanoPickr.destroyAndRemove();
        }

        // Apply active class
        for (const btn of nanoButtons) {
            btn.classList[btn === button ? 'add' : 'remove']('active');
        }

        // Create fresh instance
        nanoPickr = new Pickr(Object.assign({
            el,
            theme,
            default: '#09ad95'
        }, config));

        // Set events
        nanoPickr.on('init', instance => {
            console.log('Event: "init"', instance);
        }).on('hide', instance => {
            console.log('Event: "hide"', instance);
        }).on('show', (color, instance) => {
            console.log('Event: "show"', color, instance);
        }).on('save', (color, instance) => {
            console.log('Event: "save"', color, instance);
        }).on('clear', instance => {
            console.log('Event: "clear"', instance);
        }).on('change', (color, source, instance) => {
            console.log('Event: "change"', color, source, instance);
        }).on('changestop', (source, instance) => {
            console.log('Event: "changestop"', source, instance);
        }).on('cancel', instance => {
            console.log('cancel', nanoPickr.getColor().toRGBA().toString(0));
        }).on('swatchselect', (color, instance) => {
            console.log('Event: "swatchselect"', color, instance);
        });
    });

    themeContainer2.appendChild(button);
}

nanoButtons[0].click();