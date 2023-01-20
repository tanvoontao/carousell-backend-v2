const convertToSlug = (name) => {
    if (name) {
        let slug = name.toLowerCase()
        slug = slug.replace(/&/g, '') // --> remove ampersands '&'
        slug = slug.replace(/ /g, '-') // --> replace spaces with hyphens '-'
        slug = slug.replace(/[^a-z0-9-]/g, '-') // --> replace all other non-alphanumeric characters with hyphens
        slug = slug.replace(/-+/g, '-') // --> remove consecutive hyphens
        return slug
    }
    throw new Error("Name is required for converting slug. ");
}

module.exports = { convertToSlug }