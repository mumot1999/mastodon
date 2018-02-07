Important Notes Regarding this fork
===================================

This is the fork mastodon as deployed on https://mastodon.host, necessary to add a few customisations and integrate it in a CI pipe for deployment.

Patches implemented:
- PIWIK integration ( allows to have some nice anonymous, self hosted and opensource analytics on the visitors ).
- Full Text search for statuses ( upstream code only allow searching users and hashtags, or needs Elastic Search to allow searching your own statuses only ).
- FTS for your home timeline ( not only your own toots, but also people you follow ).
- 20 results instead of 5 per type of search.
- The FAQ link on the homepage points to /about/more instead of the github repo.
- 1024 character limit for posts instead of 500 ( TODO: implement that as a configuration instead of being hardcoded ).
- 512 character limit instead of 160 for profile bio ( TODO: implement that as a configuration instead of being hardcoded ).
- replies and reboosts are displayed in the timelines instead of being ignored.
- CI to check every user facing function is behaving correctly.
- A few other minor tweaks like full column display to fill bigger screen, and other improvements...
- Oauth patch to allow authentication by either the local username or the email ( necessary for the XMPP integration ).

Regarding FTS on this server, the code itself is not enough, you also need to alter the status table to add a tsvector index tsv, and a trigger to generate that column 
from the text status ( generate the indexes to speed up FTS ).

This is done this way:
- ALTER TABLE statuses ADD COLUMN tsv tsvector;
- CREATE INDEX tsv_idx ON statuses USING gin(tsv);
- CREATE FUNCTION tsv_update_trigger() RETURNS trigger
    AS $$ begin new.tsv := to_tsvector(new.text); return new; end $$ LANGUAGE plpgsql;
- CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE ON statuses FOR EACH ROW EXECUTE PROCEDURE tsv_update_trigger();

And of course, you need to populate that index for the statuses already in your DB ( it will take a LONG time if you have a big statuses DB ):
- UPDATE statuses SET tsv =to_tsvector(coalesce(text,''));

I am investigating at the moment to use the gem "pg_search", to ease coding there. Currently you are limited to see the latest 20 search results seen by your instance for the statuses.
I will release soon the version allowing searching your home timeline.

Notes for admins that want to just integrate the patch for FTS ( to allow not using ES and save a bit of resources ), there's a patch available in docs/ directory to apply to your instance code.
You also need to deal with the above SQL commands though.

Original README is below:

Mastodon
=======
![Mastodon](https://i.imgur.com/NhZc40l.png)

[![Upstream Build Status](http://img.shields.io/travis/tootsuite/mastodon.svg)][Upstream travis]
[![Upstream Code Climate](https://img.shields.io/codeclimate/github/tootsuite/mastodon.svg)][Upstream code_climate]

[Upstream travis]: https://travis-ci.org/tootsuite/mastodon
[Upstream code_climate]: https://codeclimate.com/github/tootsuite/mastodon

Mastodon is a **free, open-source social network server** based on **open web protocols** like ActivityPub and OStatus. The social focus of the project is a viable decentralized alternative to commercial social media silos that returns the control of the content distribution channels to the people. The technical focus of the project is a good user interface, a clean REST API for 3rd party apps and robust anti-abuse tools.

Click on the screenshot below to watch a demo of the UI:

[![Screenshot](https://i.imgur.com/pG3Nnz3.jpg)][youtube_demo]

[youtube_demo]: https://www.youtube.com/watch?v=YO1jQ8_rAMU

**Ruby on Rails** is used for the back-end, while **React.js** and Redux are used for the dynamic front-end. A static front-end for public resources (profiles and statuses) is also provided.

If you would like, you can [support the development of this project on Patreon][patreon]. Alternatively, you can donate to this BTC address: `17j2g7vpgHhLuXhN4bueZFCvdxxieyRVWd`

[patreon]: https://www.patreon.com/user?u=619786

---

## Resources

- [Frequently Asked Questions](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md)
- [Use this tool to find Twitter friends on Mastodon](https://bridge.joinmastodon.org)
- [API overview](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md)
- [List of Mastodon instances](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/List-of-Mastodon-instances.md)
- [List of apps](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/Apps.md)
- [List of sponsors](https://joinmastodon.org/sponsors)

## Features

**No vendor lock-in: Fully interoperable with any conforming platform**

It doesn't have to be Mastodon, whatever implements ActivityPub or OStatus is part of the social network!

**Real-time timeline updates**

See the updates of people you're following appear in real-time in the UI via WebSockets. There's a firehose view as well!

**Federated thread resolving**

If someone you follow replies to a user unknown to the server, the server fetches the full thread so you can view it without leaving the UI

**Media attachments like images and short videos**

Upload and view images and WebM/MP4 videos attached to the updates. Videos with no audio track are treated like GIFs; normal videos are looped - like vines!

**OAuth2 and a straightforward REST API**

Mastodon acts as an OAuth2 provider so 3rd party apps can use the API

**Fast response times**

Mastodon tries to be as fast and responsive as possible, so all long-running tasks are delegated to background processing

**Deployable via Docker**

You don't need to mess with dependencies and configuration if you want to try Mastodon, if you have Docker and Docker Compose the deployment is extremely easy

---

## Development

Please follow the [development guide](https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Development-guide.md) from the documentation repository.

## Deployment

There are guides in the documentation repository for [deploying on various platforms](https://github.com/tootsuite/documentation#running-mastodon).

## Contributing

You can open issues for bugs you've found or features you think are missing. You can also submit pull requests to this repository. [Here are the guidelines for code contributions](CONTRIBUTING.md)

**IRC channel**: #mastodon on irc.freenode.net

---

## Extra credits

The elephant friend illustrations are created by [Dopatwo](https://mastodon.social/@dopatwo)
