# offline-diff-viewer

A diff viewer that gives you sharable diff view links but does not store your data. (This takes inspiration from typescript playground how it stores your code in url itself) but the for very large data we will be doing end to end encryption just like `excalidraw` so you can still have sharable links without worrying if you should store your enterprise data or not.

# Data Privacy and security

## :bangbang: No data sent to server

- You can take a look at the source code itself.
- All your data is kept as hash fragment in URL which never makes its way to server. Totally avoiding man in middle and XSS attacks to steal your data or any data breach.
- The data always stays in your URL and browser and never makes its way on the wire. Thats the main motive behind developing this tool.
- More about reasoning, why and how can be found in [Motivation](#motivation) section below.

## End to End Encryption

- If the calculated diff data is larger 10000 characters then your data is first encrypted on browser and the encrypted data is stored on server.
- The key to decrypt the data is added as hash fragment in the url, also each diff view is encrypted with different key
- Every diff view is assigned cryptographically strong unique identifier making it impossible to guess diff view identifiers for hackers
- The data is always decrypted in browser cause the hash fragement is never sent to server by browsers, so server has no way to decrypt the data
- even if someone gets hold of your data using man in middle attack they cannot decrypt it as decryption key is available only in browser.

# Formats currently supported

1. Any texual format (JSON, HTML, Plain text, JS, CSS and any text based file content)

# Upcoming support

1. Images
2. Audio wave format

## Reason for building yet another diff viewer tool

I realise we are missing a diff viewer that is

- Privacy focused
- Simple to use
- And most importantly does not store any data on server to give sharable diff urls

## Motivation

I realise as a developer community we are missing on a diff viewer tool that does not store your data on their server to give you links to diff view to share with your teams.
There can be serious implications of storing your enterprise data on some server that you don’t know anything about.

Also current diff tools lack one major ability that is to compare any two text blocks. Many diff viewers out there target specific text types like JSON etc which is not what we want most of the time.

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
4. Compare and get a sharable url that stores your data in link itself (Like typescript playground stores your code in link)

In the chase of one such tool I ended up creating one as I did not find any that satisfied my requirements.
This is open source and has very easy user interface. Here is the link to the tool https://diffviewer.vercel.app/
It has following benefits

1. Since the tool does not always store your data on its server there is no server required in the tool
2. The tool is blazing fast
3. Most importantly the link can be shared with anyone without security concerns(Unless you share link itself over some insecure network)
4. As the link contains data whomever you share link with can get data too
5. Also note that the data is put with hash in url so server can not read the data or encryption key
6. For very large data comparison take a look at [End to End Encryption](#end-to-end-encryption) section above

[Here is sample e2e encrypted link](https://diffviewer.vercel.app/v2/diff?id=permanent-42812281783313231307#d9_okhxt7vhCLB_kXgkKVA)

[Here is a link to sample diff view](https://diffviewer.vercel.app/v2/diff#H4sIAAAAAAAAA6VZTW_bOBD9K4Eve-kS1octqyfmo02w7bbZpmgPm0VBSbTMmCK9FGXXKPrfdyjXRYz1jAvrkMT2kyM_cOa9N-NvI71oRy9Hfz-ai4tv4dfFxeNIVY-jlxfRi_3zuXKt_2JEI8Prj6Nr67yR28fRzyu0OLjgrZx7fXCBbITSO7DUO3TMn8RKmJVtPXtaPbu2lqaSbnfxa3ijls9AtfoiqsrJtt1dECdjFqURy6csTqLHUbju-4sjdGKUzoNwAudyq3y7EM1xLm29QyPeWc1K27DCncskYUnKspTFY4JFgrJ421V2rUqLM3m3lcdZaLOVMV85IzftRjkZiCAs_qQ5RFHGojEcBfyk1GmkKI93wi-EEVLjRB5WaqlM3R5nY9ofcMLD-9j8XC75jGUTKC6glKUElwneKJ3WSuJE3hi5lh5pk2UPprzoWmXgU22kXJ5_MrOIRdOMxTGLcqrApiiZN8JLB58Ep_On8F6KslTHGS2bPT7horCdZ408t1ki6PcogUKLUhaRHZOhhG6ktlTn3_x2DdokjpOpqjKAU76RRUscy2kmaRJOJYfGn1BVNkN5fBBNS6nxnTTOIlXmFj2YcbkSrLbrM1tlBn0yBiGewGkkGcEiR1lcSdERpVW-kcJUx0kUTbkM6IyXRvoh6jWDQwAdhl7JE4JFNEZpvNcKutYTXQJE9XEetgAo5xtr_UI2clBZxWnOpgy6Pk5JJrjLv6qkwVlcrp0A4zuomGdUpNjjgrfeOjXfDmsSKLBsBgUGJ5NTfHCbh9SitKb6HdStRsS4CljBSwsmqTWTVYdQue0fz3WnKoLPZMKynAGhbEaRwd3-k3K10opw-zsJWo0U2nrRgyWvpS2VV1BqaAI71TNjaPlxsMgETodkg3v--0JUSiyInnGqqjUqALbY4xWP4uR3J2uoNtYtz-SUhQQDlTaBP1SKiXDrv9RzJyuSUXsQ1p7REUUPSr618C7lhwSyCRg-yFqUxOCVZOfgzn_jupKKMfd26-GWiFGuduicf3VSDBKBEF4g7kOlxUlMUcE9_952RLC8l8IdBJxnPFarHqx5q8WgEwFhjpMcUsupfsEd_xaEDGdxbRvobu-RGFaXe3wBfmkGncg4Dh0CyRIiDBVeItz3L423RhFO89kutHRIdYnNDlUDrT8O6YVNQoQhh0jc-D_BDYwn8_GlM5B6EUkWPfjEwfqFBynzqhx0NHnOwmgMNpPsA8Cj-Wf0AiLfGRO_Vg2lZWD0Bptjih065q3tTFVq21VD9CxjWcSmkGsSqnnwGPBKK2GsI8cYV2IDPzwMYMT9RkHKc0P1bJaFgMZmk7Nm_qv-c6FqtrUeOZRiFbCYy85ZCP4SSzMntQymMDDL4P0xFTNx6790CgIVcRofnWxAtLExWfg9nvBCW9sU0tWDTiUCbYZ5ZpKd0DTc-x-6Jbkds2v5ZJHtWKt3aMpLrcplIcySmQPyz9lcqf0zgg8LhwSlRh0Qbv6fVBnyO5Gbr-TcYXTWRQ9OIMp0y26ooEUxDGgpI20T9_5rUSpyHXMJtVMJXWOLS7HHp_wrjAODB5ocIgBI9PSsqf8dVEeIh8R2Sco1lsrMsgczDiG1UgOMM0_6PQwMNFS4xO3_TjSUht3BzYDocRKLxQ6d8bkoZWHtgP1YlI_BKCEjh8xPhks8AoQo0ycrosY-i6XUSIGJTQ_mfCsW1g4qr2D9YYsxCwngvPn_AYZETQ1lN8qXi6JzBlGyao8LrkylZG1ritTlSSmDeAYCkMAJJWTYxM3_D0Ho8jU8FebgEzyj81T-gAvu5YAEA0NlNA1b2LDAJAsN9_17ZcqO6PxLv5XIbLkSASu5EWsyvZxgARksisPSDwqMJIE7f78tJhYYH2wrN0IjK4zG_YArvlZGWEeNlqfJTAKXlJEhhpj2byFTEt9XeCeMqBcC6ZS6_XmB5GHebyQdLX9l6B8HHWMJZS7EyN9PM0vC9P_q5FYqh1TZ-t8f8PxXdhgn5SwFMsEpwTTJ1E8M_g8gQZLaynaulpiSFT1Y8wpe2obXye3SLwR_NgVGccRm1DcXxALgtXXw7_yBVv1_Y64cjNbHKc2bctnDC-4778MW0AumsJx5ouBCBoB0Bn2UnrkFeBBOUqPzlWhbhUhBW_Sg-qXV324_C-VJOg0kgVm6W5qRXy4R-4BrLRxhNrdwPyyclXUPPvFWylYIIv-f_hoA9Dmd9SvAeHy4B9CL9i0kWj16OXrvVA0iqi8-yq9-tyLYQ9cgSrWsdsj3_wBPobtqMCAAAA)

## TODO/Upcoming features

Please check all To dos and upcoming things [here](https://github.com/technikhil314/offline-diff-viewer/projects/1)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
# Note that the command below will serve only via nuxt server and
# wont run vercel functions used for e2e encryption link generation
$ npm run dev

# if you want to run vercel function during development
# then first create a vercel project from this repo by logging in on vercel.com
# then run following command and follow the instructions on terminal
$ npx vercel dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Self Host

This guide provides detailed instructions on how to self-host the offline-diff-viewer application using Docker and Docker Compose. Self-hosting allows you to run the application on your own server, providing you with full control over its environment and configuration.

### Building and Running the Docker Container

1. Build the Docker Image

```bash
$ docker build -t offline-diff-viewer .
```

2. Run the Docker Container via docker run command

```bash
$ docker run -d \
  --name offline-diff-viewer \
  -p 3000:80 \
  --security-opt no-new-privileges:true \
  -v /var/log/nginx:/var/log/nginx \
  --restart unless-stopped \
  -e NODE_ENV=production \
  -e NODE_OPTIONS=--openssl-legacy-provider \
  offline-diff-viewer
```

### Running the Container with Docker Compose

```bash
$ docker compose up -d --build
```
