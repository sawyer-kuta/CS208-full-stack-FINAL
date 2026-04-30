# CS208 Final Project - Downtown Donuts Website

- Name: Sawyer Kuta
- GitHub: [https://github.com/sawyer-kuta](https://github.com/sawyer-kuta)
- Term: Spring 2026

## Project Description

This is a full stack web application for CS208 as a final project. The website follows
guidelines specified by a mock client asking for a simple business webpage. The site
uses a navigation hub to travel to multiple pages as requested. A key feature is the
implementation of a comments page, complete with front and back-end validation as well
as pagination to scale with the site.

## Setup Instructions

Run the `install_db.sh` script in the setup_scripts directory. This only needs to be done once per Codespace.

```bash
./setup_scripts/install_db.sh
```

When prompted, use these settings:
- Switch to unix_socket authentication [Y/n] n
- Change the root password? [Y/n] Y — set password to 12345
- Remove anonymous users? [Y/n] Y
- Disallow root login remotely? [Y/n] Y
- Remove test database? [Y/n] Y
- Reload privilege tables? [Y/n] Y

### Create the Database Tables
```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

### Install Dependencies
```bash
npm install
```

### Run the Application
```bash
npm start
```

### Access the Application
On Codespaces, forward port 3000 and open it in your browser.

### Restarting After Codespace Restart
If the database connection is lost after restarting your Codespace, run:

```bash
sudo service mysql start
npm start
```

MySQL must be running before starting the application.

## Design Decisions

1. Client-side and sever-side validation: I chose to do validation on both sides so that errors
    are caught immediately client-side and to prevent malicious input/XSS on the server-side.
2. Separation of page and API routes for comments: I separated the page route /comments from
    the API route /api/comments to display comments without fully reloading the page and to
    keep JSON data protected and separate from HTML.
3. Stacking menu pages on mobile: I made the choice to stack the menu when viewing on mobile
    rather than change the viewing option when reading the menu. I changed from an iframe to
    a flex box for a cleaner look and had to subsequently adjust for mobile viewing.

## Edge Cases

- Server unreachable: I added a try/catch block to my comment handler to display a friendly
    message when the server is unreachable rather than crashing.
- Whitespace-only input: Should a blank name or comment be input, it will fail the !name.trim()
    or !message.trim() check and return a 400 error and display a message.
- Extremely long input: Name and message fields are limited to 20 and 500 characters respectively
    in the /api/comments route along with the whitespace check, returning the same error code.
- Double submit: My comment handler disables the submit button once hit and only re-enables it
    after the request completes.

## Challenges & Learnings

1. I struggled with getting my comments page to work and had to adjust my code multiple times. I
    finally realized that it was due to MySQL not running when I ran it though an AI program. I
    felt like I had broken it and was miserable trying to figure it out.
2. I also had issues with going back in to add XSS prevention measures and had to change an
    entire block of code in my loadComments() method. I was able to change it over but had made
    a mistake when appending the children as I forgot I swaped a div element with an article
    element.
3. Making meaningful commits was a difficulty I faced because I had not used git for much
    other than submitting a final version of an assignments. I would bounce around files and
    neglect to make commits incrementally.

## Citations

- Google Fonts - https://fonts.google.com (Italianno and Montserrat fonts)
- MDN Web Docs - https://developer.mozilla.org (Fetch API reference)
- Claude AI (Anthropic) - Used for guidance and debugging during comment page struggles