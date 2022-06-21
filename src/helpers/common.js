export const objectNullCheck = (data) => {
    var result = false;
    for (const [key, value] of Object.entries(data)) {
        if (!value) {
            result = true;
        }
    }
    return result;
}

export const getClassName = (className, active) => {
    return active ? className.replace("text", "active") : className;
}

export const numberFormat = (value) =>
    new Intl.NumberFormat('tr-TR').format(value);

export const thousandFormat = (value) =>
    new Intl.NumberFormat('en', { notation: 'compact' }).format(value);