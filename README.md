# Crypto Monitor

## Description

A crypto monitor app to track your favaorite coins and their stats/price/info. Using axios to make calls to
[CoinGecko API](https://www.coingecko.com/en/api). React router dom v6 for routing, tailwind css for styling. And finally Firebase for authentication, database and hosting.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `firebase deploy`

**Note: Connect it to your own firebas account and use your own configuration**

That would deploy your app and it will be hosted on firbase for free.

## Todos:

[x] Adding show and hide password in account panel.

[x] Adding the scroll-to-top every time page change and fixed the search crypto search bar until the bottom of 10th coin.

[ ] Add forget password bot ,so that user can recover there password if it forget.

[ ] Send mail verification & password reset.

[ ] Adding loading screen everytime pages render & pagination upto 25 pages.

[ ] Making a new page for trending coins too..

[x] When a user is logged in and opens the hamburger menu(nav menu on smaller screens). It still gives the options of the user signing up/sign in. Update this so that it only displays Home, Account and Logout options if a user is logged in.

[x] Its a bit repetitive to have the account /signout options in the main nav bar if those options are available after pressing the hamburger icon. once again this is only for mobile screen sizes. I completely removed it on only let it appear if you press the hamburger menu icon. I left it as is for the larger screen.
