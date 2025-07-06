---
title: s
layout: listpage
---

{% assign pp = site.pages | sort_natural: "title" %}
{% for p in pp %}[🔹{{ p.title }}  ]({{ p.url }}) {% endfor %}
