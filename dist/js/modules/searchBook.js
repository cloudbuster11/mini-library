export function handleSearch(allBooks, renderAllBooks) {
    const inputElem = document.querySelector('.searchbar__inputfield');
    if (!inputElem)
        return;
    const searchInput = inputElem.value;
    const result = searchBook(allBooks, searchInput, ['title', 'author']);
    if (result.length === 0)
        alert('No books found. Try again!');
    else
        renderAllBooks(result);
}
function searchBook(allBooks, search, keys) {
    const lowSearch = search.toLowerCase();
    return allBooks.filter((books) => keys.some((key) => String(books[key])
        .toLowerCase()
        .includes(lowSearch)));
}
