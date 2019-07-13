const isEmpty = (value) => value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)

// flatten arrays that come in nested
const flattenArray = arr => {
    return arr.reduce(
        (acc, val) =>
            Array.isArray(val)
                ? acc.concat(flattenArray(val))
                : acc.concat(val),
        []
    );
};

module.exports = { isEmpty, flattenArray };