---
layout: "../../layouts/BlogPost.astro"
title: "Saving myself from emails"
pubDate: "June 29 2024"
---

# Problem
My gmail inbox is full of emails that are of no use to me.

They just keep coming every day.

I have spent more than enough time of my life reading these useless emails.

So. It's time to do something about it.

# Solution
Pretty much all the emails with the exception of a few handful are sent to get my attention so that the sender
can use it sell me products or services that I don't need.

I think the only emails that I am interested in getting are these
1. Emails related to login/otp/ etc.
2. Emails that are sent from a human addressed specifically to me. Example a friend, recruiter, etc
3. Emails related to tax, bank transactions, government notices, billing reminders etc.
4. Emails from other communication services like Slack, Zulip, Linkedin etc when someone messages me.
5. Emails from GitHub when I have a pull request to review, issue to respond to etc.
In general, emails that are meant specifically for me and not sent to a group of people.


I have no interest in recieving the following kind of emails.
1. Emails from publishing platforms like Medium, Substack,  sharing new articles or posts.
2. Emails from Amazon or any ecommerce with the latest deals.
3. Emails from Netflix or any streaming providers with the latest movies.

In general any email that is not addressed to me specifically is of no significance to me. These are emails where I
am just a cog in the system or data point for their conversion rates.

# MVP
Looks like if I can filter out emails that are not sent to me and could be sent to anyone else it would be a great start.

I think I can build a quick MVP by fetching emails from gmail, passing it to LLAMA to decide the relevancy and show only
the emails that fit my criteria.

## Fetching emails using Python

### Setup Python project

First I start with initializing the python virtualenv for the project.
```
mkdir brutally-honest-inbox
cd brutally-honest-inbox
```

### Install Python package for fetching emails

I found a Python library called `simplegmail` that I can use to fetch the emails for the MVP.

```
pip3 install simplegmail
```

### Script for fetching email


## Running LLAMA to see if the email is addressed specifically to me

## Create a UI which shows emails that are addressed only to me
