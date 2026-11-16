![](doc/digits-landing-page.png)

nextjs-application-template is a sample Next.js 16 application that illustrates:

- A standard directory layout using 'src/' as recommended in the [Next.js Project Structure](https://nextjs.org/docs/getting-started/project-structure) guide.
- [Bootstrap 5 React](https://react-bootstrap.github.io/) for user interface.
- [React Hook Form](https://www.react-hook-form.com/) for form development.
- Authorization, authentication, and registration using [NextAuth.js](https://next-auth.js.org/).
- Initialization of users and data from a settings file.
- Alerts regarding success or failure of DB updates using [Sweet Alert](https://sweetalert.js.org/).
- Quality assurance using [ESLint](http://eslint.org) with packages to partially enforce the [Next.js ESLint rules](https://nextjs.org/docs/app/building-your-application/configuring/eslint).

The goal of this template is to help you get quickly started doing Next.js development by providing a reasonable directory structure for development and deployment, a set of common extensions to the core framework, and boilerplate code to implement basic page display, navigation, forms, roles, and database manipulation.

To keep this codebase simple and small, some important capabilities are intentionally excluded from this template:

- Unit Testing
- Security
- Deployment

Examples of the these capabilities will be provided elsewhere.

## Installation

First, [install PostgreSQL](https://www.postgresql.org/download/). Then create a database for your application.

```

$ createdb nextjs-application-template
Password:
$

```

Second, go to [https://github.com/ics-software-engineering/nextjs-application-template](https://github.com/ics-software-engineering/nextjs-application-template), and click the "Use this template" button. Complete the dialog box to create a new repository that you own that is initialized with this template's files.

Third, go to your newly created repository, and click the "Clone or download" button to download your new GitHub repo to your local file system. Using [GitHub Desktop](https://desktop.github.com/) is a great choice if you use MacOS or Windows.

Fourth, cd into the directory of your local copy of the repo, and install third party libraries with:

```

$ npm install

```

Fifth, create a `.env` file from the `sample.env`. Edit the line `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"` to match your setup. Replace `mydb` with the PostgreSQL database that you created in the first step (in the example for this step the database is `nextjs-application-template`). replace `johndoe:randompassword` with a username and password you created for this db. If you did not create a user for this database, you can use the `postgress` user with the password you set when you installed postgress. Note: this is not a recommdened practice since the `postgres` user is an admin with full access to postgres. 

See the Prisma docs [Connect your database](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql#3-connect-your-database). 

Then run the Prisma migration `npx prisma migrate dev` to set up the PostgreSQL tables.

```
$ npx prisma migrate dev
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.
Datasource "db": PostgreSQL database "mydb", schema "public" at "localhost:5432"

Applying migration `20260301195634_init`

The following migration(s) have been applied:

migrations/
  └─ 20260301195634_init/
    └─ migration.sql

Your database is now in sync with your schema.

$

```

Create the Prisma Client by running the command `npx prisma generate`. This will create the Prisma Client in the `generated/prisma` directory, which is used by the application to interact with the database.

```
$ npx prisma generate

Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.

Generated Prisma Client (7.4.2) to ./generated/prisma in 80ms
 
```

Then seed the database with the `/config/settings.development.json` data using `npm run seed`.

```

$ npm run seed  

> nextjs-application-template-s26@0.1.0 seed
> npx tsx src/seed.ts

Seeding the database
  Creating user: admin@foo.com with role: ADMIN
  Creating user: john@foo.com with role: USER
  Adding stuff: {"name":"Basket","quantity":3,"owner":"john@foo.com","condition":"excellent"}
  Adding stuff: {"name":"Bicycle","quantity":2,"owner":"john@foo.com","condition":"poor"}
  Adding stuff: {"name":"Banana","quantity":2,"owner":"admin@foo.com","condition":"good"}
  Adding stuff: {"name":"Boogie Board","quantity":2,"owner":"admin@foo.com","condition":"excellent"}
$

```

## Running the system

Once the libraries are installed and the database seeded, you can run the application by invoking the "dev" script in the [package.json file](https://github.com/ics-software-engineering/nextjs-application-template/blob/master/app/package.json):

```

$ npm run dev

> nextjs-application-template-s26@0.1.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://XXX.XXX.XXX.XXX:3000
- Environments: .env

✓ Starting...
✓ Ready in 821ms

```

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000). You can login using the credentials in [settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json), or else register a new account.


### ESLint
You can verify that the code obeys our coding standards by running ESLint over the code in the src/ directory with:

```
$ npm run lint

> nextjs-application-template-1@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
$
```

### Building the App

To build the application for production deployment, use the following command:

```bash
$ npm run build
```

This will compile the Next.js application and output the production build to the `.next/` directory.

After building, you can start the production server with:

```bash
$ npm start
```

Make sure your environment variables and database are properly configured before building for production.

### Testing
This project uses [Playwright](https://playwright.dev/) for end-to-end and authentication testing. Tests are located in the `tests/` directory and cover user flows, authentication, and admin features.

To run all tests:

```
$ npx playwright test
```

You can run tests for a specific file:

```
$ npx playwright test tests/john-pages.spec.ts
```

To view tests in headed mode (see the browser UI):

```
$ npx playwright test --headed
```

For more information, see the [Playwright documentation](https://playwright.dev/).


## Walkthrough

This walkthrough follows the main pages of the digits contact manager.

### Landing page (`/`)

The landing page introduces the address book, contact details, and timestamped notes. Visitors can use the Login menu to sign in or create an account.

### Sign in and sign up (`/auth/signin`, `/auth/signup`)

Sign in with an existing account to open the contacts list. New users can register with an email and password; after registration, they are signed in and taken to Add Contact.

### Add Contact (`/add`)

Signed-in users can create a contact by entering the person's first and last name, address, image URL, and description. The form associates the contact with the current user's email.

### List Contacts (`/list`)

This page displays the signed-in user's contacts. Each contact card shows its details and timestamped notes. The Add Timestamped Note form attaches a note to that contact, and the Edit link opens its edit page.

### Edit Contact (`/edit/[id]`)

Users can update a contact's name, address, image, and description. Submitting the form saves the changes and returns to the contacts list.

### Admin (`/admin`)

Users with the ADMIN role can view contacts across all users, including their notes. Other users are not authorized to access this page.

### Account menu

The account menu provides links to change the password and sign out. Visitors who are not signed in can use it to sign in or register.

### Data tables

The database stores users, contacts, and notes. A contact can have multiple notes; each note records its text, owner, contact, and creation time. The models are defined in [prisma/schema.prisma](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/prisma/schema.prisma), and sample users and contacts can be loaded with `npx prisma db seed`.

### CSS

The application uses the [React implementation of Bootstrap 5](https://react-bootstrap.github.io/). You can adjust the theme by editing the `src/app/globals.css` file. To change the theme override the Bootstrap 5 CSS variables.

```css
/* Change bootstrap variable values.
 See https://getbootstrap.com/docs/5.2/customize/css-variables/
 */
body {
  --bs-light-rgb: 236, 236, 236;
}

/* Define custom styles */
.gray-background {
  background-color: var(--bs-gray-200);
  color: var(--bs-dark);
  padding-top: 10px;
  padding-bottom: 20px;
}
```

### Routing

The application uses [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing). Page routes live under `src/app/`, including `/add`, `/list`, `/edit/[id]`, `/admin`, and the authentication pages.

Routing is defined by the directory structure.

### Authentication

For authentication, the application uses the NextAuth package.

When the database is seeded, [config/settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json) provides default user accounts and contacts.

The application allows users to register and create new accounts at any time.

### Authorization

Signed-in users can manage their contacts and notes. The `/admin` page is restricted to users with the ADMIN role.

### Configuration

The [config](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config) directory is intended to hold settings files. The repository contains one file: [config/settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json).

The [.gitignore](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/.gitignore) file prevents a file named settings.production.json from being committed to the repository. So, if you are deploying the application, you can put settings in a file named settings.production.json and it will not be committed.

### Quality Assurance

#### ESLint

The application includes a [.eslintrc.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/.eslintrc.json) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
[~/nextjs-application-template]-> npm run lint

> nextjs-application-template-1@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
[~/nextjs-application-template]->
```

ESLint should run without generating any errors.

It's significantly easier to do development with ESLint integrated directly into your IDE (such as VSCode).


#### Playwright End-to-End Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end and authentication testing. Playwright tests are located in the `tests/` directory and cover user flows, authentication, and admin features. These tests help ensure that the application works as expected from the user's perspective and that critical workflows are protected against regressions.

**How to run Playwright tests:**

- To run all tests:

  ```
  npx playwright test
  ```

- To run tests for a specific file:

  ```
  npx playwright test tests/john-pages.spec.ts
  ```

- To view tests in headed mode (see the browser UI):

  ```
  npx playwright test --headed
  ```

For more information, see the [Playwright documentation](https://playwright.dev/).


#### Continuous Integration (CI)

Continuous Integration is implemented using GitHub Actions. The workflow is defined in `.github/workflows/ci.yml` and runs automatically on every push or pull request to the `main` or `master` branches.

The CI workflow performs the following steps:

- Checks out the repository code.
- Sets up Node.js and installs dependencies.
- Installs Playwright browsers and dependencies.
- Generates the Prisma client and runs database migrations.
- Seeds the test database.
- Runs ESLint to check code quality.
- Builds the Next.js application.
- Runs Playwright end-to-end tests.
- Uploads the Playwright test report as a workflow artifact for review.

The workflow uses a PostgreSQL service for testing and sets environment variables for the test environment. You can view and download the Playwright test report from the workflow run's summary page in GitHub Actions.

For details, see the [`ci.yml` workflow file](.github/workflows/ci.yml).

<!--
## Screencasts

For more information about this system, please watch one or more of the following screencasts. Note that the current source code might differ slightly from the code in these screencasts, but the changes should be very minor.

- [Walkthrough of system user interface (6 min)](https://youtu.be/48xu1hrqUi8)
- [Data and accounts structure and initialization (18 min)](https://youtu.be/HZRjwrVBWp4)
- [Navigation, routing, pages, components (34 min)](https://youtu.be/XztTdHpv6Jw)
- [Forms (32 min)](https://youtu.be/8FyWR3gUGCM)
- [Authorization, authentication, and roles (12 min)](https://youtu.be/9HX5vuXTlvA)
-->
