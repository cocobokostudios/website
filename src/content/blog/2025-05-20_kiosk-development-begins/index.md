---
title: "Kiosk Devlog #1: Kiosk Development (and Devlog) Begins!"
pubDate: 2025-05-19T08:44:00-06:00
author: "David Wesst"
description: "First devlog for Kiosk-- and you have to start somewhere, right? 😊"
category: "devlog"
tags: ["project-kiosk", "development-update"]
---

Kiosk development has been happening for longer than a week-- but you have to start writing updates at some point. So here is what has happened in a pretty short period.

This week (or so) on Kiosk:

- Refined the scope of "Charter" into "Kiosk" which has similar mechanics and themes, but a smaller scope more managable scope.
- Created a GDD for the MVP (minimum viablue product) and captured what would be required in terms of mechanics
- Setup a GitHub project with the seven features that need to be created as part of the MVP
- Setup the airport scene, created models for the storefront and people, and experimented with perspective and orthongonal cameras. Decided to go with orthogonal for both the storefront camera and the overhead terminal map camera.
- Implemented the MVP for customer spawing and customer movement. Customers spawn on the both the east and west side of the terminal and cross in front of the storefront. Logic was implemented for them to move around each other if they happen to bump into one and other.
- Setup an interaction zone in front of the store where customers can "browse" the contents of the kiosk if they pass through the zone. Once in zone, there is a random (50/50) chance of the customer browsing. This is denoted by the customer slowing down on their path through the zone and then speeding up again when they leave the zone.

Still feeling better about this project that I did about Charter. Not because I don't want to make Charter, but that game is going to require more scope and skill than I currently have. This one seems much more manageable for the time being-- especially with plan outlined for the MVP, and having gone over the plan a few times and still not come back with "oh, I want to add _this_".
