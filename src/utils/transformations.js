export const capitalize = (name) => {
    // todo: build this function
    // `capitalize("jOn")` should output `"Jon"`
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export const formatPhoneNumber = (phone) => {
    if (!phone) return;
    return phone
        .split('')
        .reduce((acc, val, index) => {
            const shouldAddHyphen = index > 0 && index % 2 === 0;
            return [...acc, shouldAddHyphen ? `-${val}` : val].join('') 
        })
}