const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 725,
            height: 675
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('chrome://new-tab-page/');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://chat.floridajs.com/');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#typingThang')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 231,
                y: 25.05206298828125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#typingThang')
        ])
            .setTimeout(timeout)
            .fill('funny dog');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Enter');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('img:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 115,
                y: 113.78125,
              },
            });
    }
    {
        const targetPage = page;
        await waitForElement({
            type: 'waitForElement',
            target: 'main',
            selectors: [
                '.gif'
            ],
            count: 1
        }, targetPage, timeout);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#typingThang'),
            targetPage.locator('::-p-text(funny dog)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 306,
                y: 32.05206298828125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#typingThang')
        ])
            .setTimeout(timeout)
            .fill('good bye');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Enter');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('img:nth-of-type(4)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 92,
                y: 53.83331298828125,
              },
            });
    }

    await browser.close();

    async function waitForElement(step, frame, timeout) {
      const {
        count = 1,
        operator = '>=',
        visible = true,
        properties,
        attributes,
      } = step;
      const compFn = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      }[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        let result = compFn(elements.length, count);
        const elementsHandle = await frame.evaluateHandle((...elements) => {
          return elements;
        }, ...elements);
        await Promise.all(elements.map((element) => element.dispose()));
        if (result && (properties || attributes)) {
          result = await elementsHandle.evaluate(
            (elements, properties, attributes) => {
              for (const element of elements) {
                if (attributes) {
                  for (const [name, value] of Object.entries(attributes)) {
                    if (element.getAttribute(name) !== value) {
                      return false;
                    }
                  }
                }
                if (properties) {
                  if (!isDeepMatch(properties, element)) {
                    return false;
                  }
                }
              }
              return true;

              function isDeepMatch(a, b) {
                if (a === b) {
                  return true;
                }
                if ((a && !b) || (!a && b)) {
                  return false;
                }
                if (!(a instanceof Object) || !(b instanceof Object)) {
                  return false;
                }
                for (const [key, value] of Object.entries(a)) {
                  if (!isDeepMatch(value, b[key])) {
                    return false;
                  }
                }
                return true;
              }
            },
            properties,
            attributes
          );
        }
        await elementsHandle.dispose();
        return result === visible;
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to querySelectorAll');
      }
      let elements = [];
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        if (i < selector.length - 1) {
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
        }
      }
      return elements;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      const timeoutId = setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          clearTimeout(timeoutId);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});
