'use strict';

var SHA3 = require('crypto-js/sha3');

var sha3 = function sha3(value) {
    return SHA3(value, {
        outputLength: 256
    }).toString();
};

var isAddress = function isAddress(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // Check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

var isChecksumAddress = function isChecksumAddress(address) {
    // Check each case
    address = address.replace('0x', '');
    var addressHash = sha3(address.toLowerCase());

    for (var i = 0; i < 40; i++) {
        // The nth letter should be uppercase if the nth digit of casemap is 1
        if (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i] || parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i]) {
            return false;
        }
    }
    return true;
};

module.exports.isAddress = isAddress;
module.exports.isChecksumAddress = isChecksumAddress;
