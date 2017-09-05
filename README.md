# Code Snip Manager

1. Authentication with Passport
2. Session data persists in MongoDB in case server restarts
3. CodeMirror.js used for the snippets with syntax higlighting
4. Snippet can receive 'likes' and average rating listed
5. Users can update or delete any of their existing snippets

# Install some snippets and users:

You will need two collections, snippets and users, to have some data to play with.

1. `mongoimport --db code-snippet-manager-project --collection snippets fixtures/snippet_data_dump.json`
2. `mongoimport --db code-snippet-manager-project --collection users fixtures/users_data_dump.json`
