# CS208 Final Project - Downtown Donuts Website

- Name: Sawyer Kuta
- GitHub: [https://github.com/sawyer-kuta](https://github.com/sawyer-kuta)
- Term: Spring 2026

## Project Description


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

## Design Decisions

1. 
2. 
3. 

## Edge Cases

- Server unreachable:
- Whitespace-only input:
- Extremely long input:
- Double submit:

## Challenges & Learnings

1. 
2. 

## Citations

-