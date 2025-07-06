---
title: short cut
layout: listpage
---

{% assign pp = site.pages | sort_natural: "name" %}
{% for p in pp %}[{{ p.scname }}  ]({{ p.url }}) {% endfor %}
