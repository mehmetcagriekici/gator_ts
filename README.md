BootDev - BlogAggregator 

1) What is BlogAggregator?
    BlogAggregator is an RSS feed aggregator.

2) What does BlogAggregator do?
    . Add RSS feed from the internet to be collected
    . Store the collected posts in a PostgreSQL database
    . Follow and unfollow RSS feeds that other users have added
    . View summaries of the aggregated posts in the terminal, with a link to the full post

3) Requirements
    . This is a multi-user CLI application. There is no server, so it's only intended for local use, but you can still have muliple users on a single device.
    . Manually create a config file in your home directory ```~/.gatorconfig.json```. This file will hold the current user "current_user_name" and the connection credentials for the PostgreSQL database "db_url"
    . You will need to install Go and Postgres to use this program.

4) How to Use?
    . There are multiple commands that will allow you to use the application
    . register: adds a new user to the database, you need to run this if you don't have any users.
    . login: sets the current user in the config
    . users: lists all the users in the table
    . reset: resets the database
    . addfeed: adds a new feed to the database. Needs 2 arguments: the name of the feed and the url of the feed
    . feeds: lists all the feeds in the database
    . follow: takes a single url arguments and creates a new feed follow record for the current user
    . following: displays all of the feeds the current user is following
    . unfollow: takes a single feed url and unfollows it for the current user
    . agg: fetches the rss feeds with a ticker in an infinite loop, displays the titles. Might cause DOS on the target server, QUIT with CTRL+C
    . browse: displays the posts' details with a provided limit - default to 2.

This is a BootDev training project.

