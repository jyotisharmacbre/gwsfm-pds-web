
export const toCurrency = (value: string): string => {
    let val = value;
    if (val === "") { return ''; }

    val = val.replace(/[$]/gi, '');
    val = val.replace(/[,]/gi, '');
    let num = parseInt(val);

    if (isNaN(num)) { return ''; };

    num = Math.round(num);
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function (acc, val, i, orig) {
        return val == "-" ? acc : val + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

export const toNumber = (value: string): string => {
    let val = value;
    if (val === "") { return ''; }

    val = val.replace(/[$]/gi, '');
    val = val.replace(/[,]/gi, '');
    let num = parseInt(val);

    if (isNaN(num)) { return ''; };

    num = Math.round(num);
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function (acc, val, i, orig) {
        return val == "-" ? acc : val + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

