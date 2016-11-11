{% if r.methods %}
{% for mname, m in methods -%}
  {% include "./method-partial.js" with m %}
{%- endfor -%}
{%- endif -%}
{% if r.resources %}
{% for rname, r in resources %}
  {%- include "./resource-partial.js" with r -%}
{%- endfor -%}
{%- endif -%}
