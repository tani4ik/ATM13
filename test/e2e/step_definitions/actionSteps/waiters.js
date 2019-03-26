"use strict";
let {When} = require('cucumber');
const elementHelper = require('../utils/stepFunctions.js').getPageObjectElement;
const stepFunctions = require('../utils/stepFunctions.js')
const logger = require('../../config/loggerConfig.js').logger;

const CLICKABLE_TIMEOUT = 20 * 1000;

When(/^I wait until "([^"]*)" is (.*)$/, (alias, shouldBe) => {// (present|clickable|visible|invisible|selected|gone)
    let element = elementHelper(alias);
    let expectedConditionFunction = stepFunctions.expectedCondition(shouldBe);
    logger.warn(`I wait until ${alias} is ${shouldBe}`);
    return browser.wait(expectedConditionFunction(element), CLICKABLE_TIMEOUT);
});