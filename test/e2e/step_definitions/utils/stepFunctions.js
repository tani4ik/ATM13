const EC = protractor.ExpectedConditions;
const burberryPO = require('../../po/burberryPageObject.json');
const logger = require('../../config/loggerConfig.js').logger;
    let getPageObjectElement = (alias) => {
        let pageElement = burberryPO[alias];
        if (pageElement['isCollection'] === true) {
            pageElement = element.all(by.css(pageElement.selector));
            return pageElement;
        }
        else {
            pageElement = element(by.css(pageElement.selector));
            return pageElement;
        }
    };

    let expectedCondition = (shouldBe) => {
        let expectedConditionFunction;
    
        switch (shouldBe) {
            case "present":
                expectedConditionFunction = EC.presenceOf.bind(EC);
                break;
            case "clickable":
                expectedConditionFunction = EC.elementToBeClickable.bind(EC);
                break;
            case "visible":
                expectedConditionFunction = EC.visibilityOf.bind(EC);
                break;
            case "invisible":
                expectedConditionFunction = EC.invisibilityOf.bind(EC);
                break;
            case "selected":
                expectedConditionFunction = EC.elementToBeSelected.bind(EC);
                break;
            case "gone":
                expectedConditionFunction = EC.stalenessOf.bind(EC);
                break;
            default:
                logger.error(`Wrong expected condition provided: [${shouldBe}]`);
                throw new Error('Wrong expected condition provided.');
        }
        return expectedConditionFunction;
    };

    let highlightElement = (alias) => {
        let styleOptions = "color: Red; border: 2px solid red;";
        let webElement = getPageObjectElement(alias);
        return browser.executeScript("arguments[0].setAttribute('style', arguments[1]);", webElement, styleOptions).then(() => {
            return browser.wait(() => {
                return getPageObjectElement(alias).getCssValue('border').then((border) => {
                    return border.toString().indexOf('2px solid rgb(255,') > -1;
                });
            }, 5000, 'Style is not applied!');
        }, (error)=> {
            logger.error('Error is: ' + error);
        });
    };

    module.exports = {
        getPageObjectElement,
        expectedCondition,
        highlightElement
    }