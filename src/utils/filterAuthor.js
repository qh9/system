export const filterAuthor = (mainRouters, author) => {
    let filterRes = mainRouters.filter(item => {
        return item.meta.author.indexOf(author) > -1
    })
    filterRes.forEach(val => {
        if (val.children) {
            val.children = filterAuthor(val.children, author)
        }
    })
    return filterRes
}
