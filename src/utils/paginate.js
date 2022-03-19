export function paginate(items, pageNumber, pageSize) {
  return items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
