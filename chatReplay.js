import url from 'url';
import { createRunner } from '@puppeteer/replay';

export async function run(extension) {
    const runner = await createRunner(extension);

    await runner.runBeforeAllSteps();

    await runner.runStep({
        type: 'setViewport',
        width: 725,
        height: 675,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
    });
    await runner.runStep({
        type: 'navigate',
        url: 'chrome://new-tab-page/',
        assertedEvents: [
            {
                type: 'navigation',
                url: 'chrome://new-tab-page/',
                title: 'New Tab'
            }
        ]
    });
    await runner.runStep({
        type: 'navigate',
        url: 'https://chat.floridajs.com/',
        assertedEvents: [
            {
                type: 'navigation',
                url: 'https://chat.floridajs.com/',
                title: ''
            }
        ]
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                '#typingThang'
            ]
        ],
        offsetY: 25.05206298828125,
        offsetX: 231,
    });
    await runner.runStep({
        type: 'change',
        value: 'funny dog',
        selectors: [
            [
                '#typingThang'
            ]
        ],
        target: 'main'
    });
    await runner.runStep({
        type: 'keyDown',
        target: 'main',
        key: 'Enter'
    });
    await runner.runStep({
        type: 'keyUp',
        key: 'Enter',
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'img:nth-of-type(2)'
            ]
        ],
        offsetY: 113.78125,
        offsetX: 115,
    });
    await runner.runStep({
        type: 'waitForElement',
        target: 'main',
        selectors: [
            '.gif'
        ],
        count: 1
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                '#typingThang'
            ],
            [
                'text/funny dog'
            ]
        ],
        offsetY: 32.05206298828125,
        offsetX: 306,
    });
    await runner.runStep({
        type: 'change',
        value: 'good bye',
        selectors: [
            [
                '#typingThang'
            ]
        ],
        target: 'main'
    });
    await runner.runStep({
        type: 'keyDown',
        target: 'main',
        key: 'Enter'
    });
    await runner.runStep({
        type: 'keyUp',
        key: 'Enter',
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'img:nth-of-type(4)'
            ]
        ],
        offsetY: 53.83331298828125,
        offsetX: 92,
    });

    await runner.runAfterAllSteps();
}

if (process && import.meta.url === url.pathToFileURL(process.argv[1]).href) {
    run()
}
