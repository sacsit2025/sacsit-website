# `documents/`

The PDFs behind the site's document requests live here. They are **not** in `public/`: a file that
is asked for through a form must not be fetchable by URL, so the route reads the bytes from this
folder and serves them under a signed, fifteen-minute link.

The file each request expects is named in `content/documents.ts` (`file`). Nothing in this folder
is committed.
