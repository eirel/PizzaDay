# PizzaDay

### Introduction
You are software engineer in small development company. Every Wednesday your teammates
order pizza delivery in Local Restaurant. Usually there is about 10-15 order items (pizzas, juice
etc.) per order. Also, Local Restaurant provides discount coupons if pizza delivery guy was late.

### The Problem
After pizza was ordered you need to calculate how many $ each of your co workers owes you in
order to pay pizza delivery guy. So, you need to split the check. And there is another problem.
Each time you have 1 or couple coupons for free pizza. To keep order you need split this discount
(pizza price) between all coworkers who ordered pizza. Also, probably you noticed that you need
to do same procedure every Wednesday and it is annoying. So, why not to write small app for it?

### App features
* sign in/sign up
* Google authentication
* create users Groups (so, you don’t need to search for your co workers over whole users list
  in app). Only Group creator may invite or remove people. Group should have name,
  image/logo, menu items that can be ordered in this group (made for simplicity, so we
  avoiding creating of restaurant).
* Menu item should contain it’s name and price. Any group participant can create menu
  items or edit existing ones.
* Group creator is able to add/remove free pizza coupons (each coupon works only for
  specific pizza (menu item)
* create new “Pizza day” Event. Event contains event date, event status
  (ordering/ordered/delivering/delivered), user’s Group (that takes part in Event). Also,
  each user from the Group should confirm he is taking part in Event, so he can add order
  items in this event.
* After Event creating each group participant (user) may choose menu items he want to order
  (+ specify count).
* When all event participants confirmed their order event status is changing to ordered. So,
  each user receives to his email list of items he ordered and total amount $ he should pay to
  event creator.
* Event creator receives same email as simple participants + event summary (list menu items
  he should order in “Local Restaurant”). After ordering event creator is able to change event
  status to delivering.
* [OPTIONAL] Ability to add discount coupons for specific menu items.

### Technical requirements/stack
* Meteor
* Blaze/React/Angular
* MongoDB
* don’t use a lot of packages. This task is simple. Notice: autopublish, insecure, autoform
  are not allowed at all.
* server side email notification rendering using some template engine (like handlebars)
* implement one or more ECMAScript 2015 classes or objects using prototyping

### Requirements
* simple, minimalistic UI
* simple, readable and formatted code
* app should be deployed on meteor.com/heroku etc.
* source code should be available on github.com
