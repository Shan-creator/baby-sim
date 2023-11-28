
function getYesOrNo(input) {
    switch (input) {
        case true:
            return `yes`;
        case false:
            return `no`
        default:
            break;
    }
}

module.exports = {getYesOrNo}