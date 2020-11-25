"use strict";

const yargs = require("yargs").argv;
const path = require("path");
const cucumberHtmlReporter = require("cucumber-html-reporter");
const junitReporter = require("cucumber-junit-convert");
const {logger} = require("./logger-config");
const {createTotalJsonReport} = require("../utilities/total-json-report");


const htmlReportOptions = {
    theme: "bootstrap",
    jsonFile: path.join(__dirname, "../reports/total-report.json"),
    output: path.join(__dirname, "../reports/cucumber-report.html"),
    reportSuitesAsScenarios: true,
    launchReport: true
}

const xmlReportOptions = {
    inputJsonFile: path.join(__dirname, "../reports/total-report.json"),
    outputXmlFile: path.join(__dirname, "../reports/junit-report.xml")
}


exports.config = {
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [path.resolve("./test/features/*.feature")],

    capabilities: {
        browserName: yargs.browser || "chrome",
        chromeOptions: {
            args: ["--no-sandbox"]
        },
        shardTestFiles: yargs.instances > 1,
        maxInstances: yargs.instances || 1
    },

    disableChecks: true,
    directConnect: true,

    cucumberOpts: {
        require: [path.resolve("./test/stepDefinitions/**/*.js")],
        ignoreUncaughtExceptions: true,
        format: [
            "json:./test/reports/report.json",
            "./node_modules/cucumber-pretty"
        ],
        tags: yargs.tags || []
    },

    onPrepare: () => {
        logger.info("Enabling waiting for Angular...");
        browser.waitForAngularEnabled(true);
        return browser.manage().window().setSize(1920, 1080);
    },

    afterLaunch: () => {
        createTotalJsonReport();
        junitReporter.convert(xmlReportOptions);
        return cucumberHtmlReporter.generate(htmlReportOptions);
    },

    onComplete: () => {
        logger.info("Closing browser...");
        return browser.close();
    }
}