const logger = (description = '', message = '') => {
    console.log('\x1b[35m', '==============');
    console.log('\x1b[0m', description, message);
    console.log('\x1b[35m', '==============');
};

module.exports = { logger };
