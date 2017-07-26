Important Notes Regarding this fork
===================================

This is the fork mastodon as deployed on https://mastodon.host, necessary to add a few customisations and integrate it in a CI pipe for deployment.

Patches implemented:
- PIWIK integration ( allows to have some nice anonymous, self hosted and opensource analytics on the visitors ).
- Text search for statuses ( upstream code only allow searching users and hashtags ).
- 20 results instead of 5 per type of search.
- The FAQ link on the homepage points to /about/more instead of the github repo.
- 1024 character limit for posts instead of 500 ( TODO: implement that as a configuration instead of being hardcoded ).
- 512 character limit instead of 160 for profile bio ( TODO: implement that as a configuration instead of being hardcoded ).
- replies and reboosts are displayed in the timelines instead of being ignored.
- Travis + CI WIP to check every user facing function is behaving correctly.
- A few other minor tweaks like full column display to fill bigger screen, and other improvements...

[![Fork Build Status](http://img.shields.io/travis/gled-rs/mastodon.svg)][travis]

[travis]: https://travis-ci.org/gled-rs/mastodon

Original README is below:

Mastodon
=======
![Mastodon](https://i.imgur.com/NhZc40l.png)

[![Upstream Build Status](http://img.shields.io/travis/tootsuite/mastodon.svg)][Upstream travis]
[![Code Climate](https://img.shields.io/codeclimate/github/tootsuite/mastodon.svg)][code_climate]

[Upstream travis]: https://travis-ci.org/tootsuite/mastodon
[code_climate]: https://codeclimate.com/github/tootsuite/mastodon

Mastodon is a free, open-source social network server. A decentralized solution to commercial platforms, it avoids the risks of a single company monopolizing your communication. Anyone can run Mastodon and participate in the social network seamlessly.

An alternative implementation of the GNU social project. Based on [ActivityStreams](https://en.wikipedia.org/wiki/Activity_Streams_(format)), [Webfinger](https://en.wikipedia.org/wiki/WebFinger), [PubsubHubbub](https://en.wikipedia.org/wiki/PubSubHubbub) and [Salmon](https://en.wikipedia.org/wiki/Salmon_(protocol)).

Click on the screenshot to watch a demo of the UI:

[![Screenshot](https://i.imgur.com/pG3Nnz3.jpg)][youtube_demo]

[youtube_demo]: https://www.youtube.com/watch?v=YO1jQ8_rAMU

The project focus is a clean REST API and a good user interface. Ruby on Rails is used for the back-end, while React.js and Redux are used for the dynamic front-end. A static front-end for public resources (profiles and statuses) is also provided.

If you would like, you can [support the development of this project on Patreon][patreon]. Alternatively, you can donate to this BTC address: `17j2g7vpgHhLuXhN4bueZFCvdxxieyRVWd`

[patreon]: https://www.patreon.com/user?u=619786

## Resources

- [List of Mastodon instances](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/List-of-Mastodon-instances.md)
- [Use this tool to find Twitter friends on Mastodon](https://mastodon-bridge.herokuapp.com)
- [API overview](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md)
- [Frequently Asked Questions](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md)
- [List of apps](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/Apps.md)

## Features

- **Fully interoperable with GNU social and any OStatus platform**
  Whatever implements Atom feeds, ActivityStreams, Salmon, PubSubHubbub and Webfinger is part of the network
- **Real-time timeline updates**
  See the updates of people you're following appear in real-time in the UI via WebSockets
- **Federated thread resolving**
  If someone you follow replies to a user unknown to the server, the server fetches the full thread so you can view it without leaving the UI
- **Media attachments like images and WebM**
  Upload and view images and WebM videos attached to the updates
- **OAuth2 and a straightforward REST API**
  Mastodon acts as an OAuth2 provider so 3rd party apps can use the API, which is RESTful and simple
- **Background processing for long-running tasks**
  Mastodon tries to be as fast and responsive as possible, so all long-running tasks that can be delegated to background processing, are
- **Deployable via Docker**
  You don't need to mess with dependencies and configuration if you want to try Mastodon, if you have Docker and Docker Compose the deployment is extremely easy
  
## Development

Please follow the [development guide](https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Development-guide.md) from the documentation repository.

## Deployment

There are guides in the documentation repository for [deploying on various platforms](https://github.com/tootsuite/documentation#running-mastodon).

## Contributing

You can open issues for bugs you've found or features you think are missing. You can also submit pull requests to this repository. [Here are the guidelines for code contributions](CONTRIBUTING.md)

**IRC channel**: #mastodon on irc.freenode.net

## Extra credits

- The [Emoji One](https://github.com/Ranks/emojione) pack has been used for the emojis
- The error page image courtesy of [Dopatwo](https://www.youtube.com/user/dopatwo)

![Mastodon error image](https://mastodon.social/oops.png)
