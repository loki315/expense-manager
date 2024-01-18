Live at : - https://expense-tracker-rb.cyclic.app/

Download this folder

Then

### `cd client`

### `npm i`

#Front-end

For building the production file use

### `npm run build`

To move it into server folder for deployment use

### `cp -r build ../server/public`

#Back-end
Then

### `cd server`

### `npm i`

1. Add appropriate data in config.env file
2. Change path of config.env in server.js file
3. git add .
4. git commit -m ""
5. git push heroku HEAD:master

<!-- Updating -->

1. To make any changes in the front-end, make sure to run the build command and then copy the build folder into server folder. Then push the changes to heroku.
2. To make any changes in the back-end, make sure to push the changes to heroku.
