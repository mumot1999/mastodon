What is Mastodo ?
=================

This is Mastodo, a Mastodon's fork implementing useful features that will not be implemented upstream.
We tend to integrate all the upstream commits, but allow more features to be available for both admins and users, while pooling the effort of maintaining a fork between multiple instances. The goal is to have a fork with on/off switches for features that are not available upstream, allowing the admin a lot of customization to suit better his community.

## Patches implemented:
- PIWIK integration ( allows to have some nice anonymous, self hosted and opensource analytics on the visitors ).
- Full Text search for statuses ( upstream code only allow searching users and hashtags, or needs Elastic Search to allow searching your own statuses only ).
- FTS for your home timeline ( not only your own toots, but also people you follow, WIP ).
- 20 results instead of 5 per type of search.
- The FAQ link on the homepage points to /about/more instead of the github repo.
- 1024 character limit for posts instead of 500 ( TODO: implement that as a configuration instead of being hardcoded ).
- 512 character limit instead of 160 for profile bio ( TODO: implement that as a configuration instead of being hardcoded ).
- replies and reboosts are displayed in the timelines instead of being ignored.
- CI to check every user facing function is behaving correctly.
- A few other minor tweaks like full column display to fill bigger screen, multiples themes, and other improvements...
- Oauth patch to allow authentication by either the local username or the email ( necessary for the XMPP integration ).
- **Glitch-Soc and Vahnj's patches are merged in the glitch-vahnj branch for now, time to add the necessary on/off switches for all those features !**

## Policy on this fork:
- Everyone willing to contribute can request R/W privileges on this repo ( via GitHub, or via Mastodon to [@gled@mastodon.host](https://mastodon.host/@gled) or to [@kemonine@mastodon.social](https://mastodon.social/@kemonine) ).
- We want to provide a customisable mastodon instance for the admins, allowing them to choose the feature set they want, and a full featured instance for your users. 
- Pull Request welcomed and accepted, whatever your rationale ( if you code something though just for you, or a niche feature, please make it optional and we'll merge it ! )
- We won't reject a feature or a modification because 'I dont like it', ever.

## Notes:
- For admins that want to just integrate the patch for FTS ( to allow not using ES and save a bit of resources ): Check the unmaintained FTS_NOES.md file !
- If you are wondering why such a fork exists, take a look at the different topics about features on https://discourse.joinmastodon.org or check the upstream repository issue lists and the replies, but you've been warned, it can be toxic.


###### Original full README is available on the upstream repository, extract below:
Mastodon is a **free, open-source social network server** based on **open web protocols** like ActivityPub and OStatus. The social focus of the project is a viable decentralized alternative to commercial social media silos that returns the control of the content distribution channels to the people. The technical focus of the project is a good user interface, a clean REST API for 3rd party apps and robust anti-abuse tools.

Click on the screenshot below to watch a demo of the UI:

[![Screenshot](https://i.imgur.com/pG3Nnz3.jpg)][youtube_demo]

[youtube_demo]: https://www.youtube.com/watch?v=YO1jQ8_rAMU

**Ruby on Rails** is used for the back-end, while **React.js** and Redux are used for the dynamic front-end. A static front-end for public resources (profiles and statuses) is also provided.

