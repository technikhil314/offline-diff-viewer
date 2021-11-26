# offline-diff-viewer

## Why another diff viewer and motivation behind the tool

## Resoning for building yet another diff viewer tool

I realise we are missing a diff viewer that is

- Privacy focused
- Simple to use
- And most importantly does not store any data on server to give sharable diff urls

## Motivation

I realise as a developer community we are missing on a diff viewer tool that does not store your data on their server to give you links to diff view to share with your teams.
There can be serious implications of storing your enterprise data on some server that you don’t know anything about

Also due to lack of such tool, if you want to see the the diff again you have to do the following

1. Ask/get the data from someone/somewhere
2. Search for a diff viewer tool online
3. Copy paste the data sources to the tool
4. Compare and share findings

This is still a mechnical part that can be easily automated. But most such tools out there right now store your data to give you sharable diff URLs which was a concerning thing at least for me for security reasons.

The simplest solution in my opinion will be

1. Get the data just once
2. Search for diff tool online just once
3. Copy your data to the tool just once
4. Compare and get a sharable url that stores your data in link itself

In the chase of one such tool I ended up creating one as I did not find any that satisfied my requirements.
This is open source and has very easy user interface. Here is the link to the tool https://diffviewer.vercel.app/
It has following benefits

1. Since the tool does not store your data on its server there is no server required in the tool
2. The tool is blazing fast
3. Most importantly the link can be shared with anyone without security concerns(Unless you share link itself over some insecure network)
4. As the link contains data whomever you share link with can get data too

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

# TODO

- [ ] Add support for multiple languages like json,yaml,xml etc
- [ ] Enable syntax highlighting
- [ ] Auto detect language
- [ ] Add small shadow to line numbers
- [x] Fix toast issue. (Click on copy button while toast is on)
- [ ] Handle line gutter issue when last line in data is empty
- [ ] Handle consecutive empty lines in input should be preserved in output
