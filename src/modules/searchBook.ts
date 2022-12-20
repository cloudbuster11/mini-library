import { Book } from './interfaces';

export function searchBook(allBooks: Book[], search: string, keys: string[]) {
  const lowSearch = search.toLowerCase();
  return allBooks.filter((books) =>
    keys.some((key) =>
      String(books[key as keyof Book])
        .toLowerCase()
        .includes(lowSearch)
    )
  );
}
