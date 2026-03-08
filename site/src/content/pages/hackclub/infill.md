---
title: "Infill!"
draft: true
---

<span class="font-mono">[[infill.hackclub.com]](https://infill.hackclub.com) [[YouTube Video]](https://www.youtube.com/watch?v=5G_g6yMLbMs)</span>

I distinctly remember around the end of January 2025 feeling awfully uninspired. I had just finished majority of fulfillment for Hackpad V1 and was now running Hackpad V2. I was really tired of macropads and wanted to run something else.

The idea of a 3D printer YSWS had been floating in my head for awhile, but I got stopped in my tracks when I kept asking the question "how can we make sure everyone is able to do this? Not everyone has a 3D printer!"

Come Friday night I had a flash of brilliance - what if we just ran it anyways? If they can figure out how to actually make a functional 3D printer, it doesn't really matter what their circumstances were from no?

And so on February 1st, sitting in my bedroom at 12:35 AM, I officially launched what would become Infill with nothing but a slack post.

<img src="/hackclub/infill/announcement.png" alt="Announcement" width="auto" class="mx-auto my-4 rounded-lg" />

There were 2 key things to realize about this:

1. I did not actually have a table booked at RMRRF
2. I had absolutely zero infrastructure built out for this.

#1 could be dealt with later - #2 though, that needed to get resolved asap!

The first thing to tackle was time tracking; see, at Hack Club we try to track how much time a teenager spends on each progress to get a metric on engagement & impact. With hackpad, I mainly just used self-reported hours and deflated any that seemed exagerrated. This worked because on average people spent <20 hours on it, so there wasn't as much drift.

3D printers on the other hand, could take 100+ hours; there's no way people can just guestimate, how are we suppoed to track that?

Thinking back to my own experience with [Neutrino](https://theopenary.com/neutrino), I remembered that I would record daily vlogs just documenting what I did each day. I definitely could not watch hours of clips, but what if we got everyone to just do written updates instead?

And so it was decided. People would journal updates about their work sessions, and that would get updated with their commits. Time to start on the website!

I really didn't want to repeat a bunch of boilerplate code for the website like I did with hackpad, so I decided to use [Astro Starlight](https://starlight.astro.build/) as a docs template; that way I could focus purely on the content.

As I was writing everything out though, I thought to myself: _wouldn't it be cool to be able to see everyone else's progress too?_

![Page with all journals](/hackclub/infill/journal_list.png)

<div class="caption">isn't this glorious?</div>

I wasn't really sure how I would implement a backend for this though, nor did I really want one. Markdown though, _god_ was I good at markdown. And so the most sensible thing to do wasn't to dynamically pull from the repositories in the built site after deployment, no no no, it was to _combine the other journals directly into the repository_ and rebuild each time! That way it would just naturally be bundled into the compiled, deployed sites.

Ordinarily this would still require a server with a cronjob, but then I discovered the wonders of GitHub actions. I then created the most vibe coded script ever that broke the moment anyone put anything in wrong. Here's how it worked:

1. First, it went throught the entire .yaml file and read the list of projects
2. Next, for each project in the .yaml file, stitch together the raw URL for the journal.md file and then download it locally
3. After that, check the local copy of the repository for any diffs
4. If diffs exist, that meant someone updated their journal. Make a commit with the changes and push!

![workflow runs](/hackclub/infill/workflows.png)

<div class="caption">As of writing this, there has been 13,703 workflow runs. Thank you GitHub!</div>

A bit of testing later and the script did in fact work! After a bit more markdown later and with #2 resolved, it was time to deal with #1.

When I originally applied for an exhibitor booth in mid-feb, I had been waitlisted as it was already quite late. I figured that this would be a non-issue. Surely they could prop up another table for something as incredible as Hack Club, right?

_right?_

I shot out an email to the RMRRF team explaining the situation and seeing what they could do. Here's what it looked like:

![RMRRF email](/hackclub/infill/rmrrf_email.png)

<div class="caption"> I really thought that this would do it. just look at that masterful writing.</div>

Turns out, this did NOT work. The venue really was just jam packed and there wasn't any way we could really be accomodated. _Shoot_ I thought, we might have to move to Open Sauce instead. I updated the site to just say "Hack Club event" and let it sort of run passively for a month.

Come a random afternoon on March 24th, I got an email out of the blue from Justin (who runs RMRRF) explaining that a sponsor had pulled out last minute and that there was an extra exhibitor spot available. I had 48 hours to confirm + send over $500 to confirm it.

I couldn't believe my eyes. This event really was happening! I could not have been happier. The last time I had a booth at a maker-faire related event was 2016. _two thousand and 16._

Quick checklist on what needed to get done logistics wise:

- Lodging - this one needed to be booked ASAP as prices were rising
- Staffing for the event - there was no way I could run this thing alone, so I needed to find another HQ member to help staff
- Actual day-to-day plans about how this whole thing was gonna run
- Parent calls & info sessions so that people could actually go!

Pretty soon I started looking into lodging. What the hell was that going to look like? We were already way past booking hotels that weekend, as it would've cost us roughly 9k for the ~10-15 people who were there. AirBNB it is! As I was looking around though...

The cheapest option was $7000. That was over half a year's worth of my rent at the time. All for 5 days.

No matter how much I looked around,

No other option, I suppose. With a heavy finger, I went ahead and clicked "book"

To the host's credit, it was very, very nice.

![airbnb image](/hackclub/infill/airbnb_banner.png)

<div class="caption">Hack Club Infill house, May 2025</div>

The actual event itself was genuinely magical. The YouTubers being there really legitamized their projects

Post mortem

- How it started and how banged together it was
    - Hosting th
- The actual buildup to the event & the crazy logistics behind that
- The event itself
- Some post mortem thoughts

Biggest surprises:

- Some kid made one without ever having had a 3D printer
- How much media attention we got from
