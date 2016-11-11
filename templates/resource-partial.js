{% if r.methods %}
{% for mname, m in methods -%}
  { method: '{{ m.httpMethod }}', handler: '{{ m.id }}', path: '{{ (servicePath + m.path)|buildurl|toExpressPath }}',},

{% endfor -%}
{% endif -%}
{% if r.resources %}
{% for rname, r in resources %}
  {%- include "./resource-partial.js" with r -%}
{%- endfor -%}
{%- endif -%}
