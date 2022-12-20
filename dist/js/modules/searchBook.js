export function searchBook(allBooks, search, keys) {
    const lowSearch = search.toLowerCase();
    return allBooks.filter((books) => keys.some((key) => String(books[key])
        .toLowerCase()
        .includes(lowSearch)));
}
