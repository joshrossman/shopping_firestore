module.exports = {
    preset: 'ts-jest',
    //javascrip implementation of the webs dom. Allows us to run through JS dom instead of regular browser.
    testEnvironment: 'jsdom',
    //Jest should look for modules here, in folder node modules or src folder
    moduleDirectories: ['node_modules','src'],
};