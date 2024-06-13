export const capitalize = (name) => {
    // todo: build this function
    // `capitalize("jOn")` should output `"Jon"`
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const formatted = `${phone.slice(0, 2)}-${phone.slice(2, 4)}-${phone.slice(4, 6)}-${phone.slice(6)}`;
    return formatted;
}