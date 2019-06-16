// this helper is used to check if a value is empty regardless of what it might be

const isEmpty = (value) => value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)

export default isEmpty;