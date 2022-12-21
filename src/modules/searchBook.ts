import { Book } from './interfaces';

export function handleSearch(allBooks: Book[], renderAllBooks: Function): void {
  const inputElem: HTMLInputElement | null = document.querySelector('.searchbar__inputfield');
  if (!inputElem) return;
  const searchInput: string | null = inputElem.value;
  const result: Book[] = searchBook(allBooks, searchInput, ['title', 'author']);
  if (result.length === 0) alert('No books found. Try again!');
  else renderAllBooks(result);
}

function searchBook(allBooks: Book[], search: string, keys: string[]): Book[] {
  const lowSearch = search.toLowerCase();
  return allBooks.filter((books) =>
    keys.some((key) =>
      String(books[key as keyof Book])
        .toLowerCase()
        .includes(lowSearch)
    )
  );
}
