---
title: Short cut list
layout: listpage
---

{% assign pp = site.pages | sort_natural: "name" %}
{% for p in pp %}{% if p.scname %}[{{ p.scname }}  ]({{ p.url }}) {% endif %}{% endfor %}


