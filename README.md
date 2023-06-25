# Barcode Project

A project to learn Rails with and refresher for Vue. The commit history has been reset as awkward mistakes were made on the learning journey (definitely still not perfect).

Probably around 10-12 hours spent on this in total.

## Deployment

Development build for now, so `rails server` (localhost:3000)

## The API

Should be @ `/api/v1/barcodes?type=isbn13&isbn={isbn_without_check_digit}`

If the isbn is in the right format, the data returned should be the isbn with the check digit.

## Linting

- I've been using `rubocop --auto-correct-all` for Rails.
- Eslint autosave configured for vscode, or manually `npm run lint`.

## Testing

Not my strength to be honest...

- `rails test` - I believe it's Minitest?
- `npm run test` - Vitest.
