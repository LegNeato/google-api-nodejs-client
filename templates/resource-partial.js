{% if r.methods %}
{% for mname, m in methods -%}
  {%- if m.mediaUpload.protocols.simple.path -%}
    {%- set path = m.mediaUpload.protocols.simple.path -%}
  {%- else -%}
    {%- set path = servicePath + m.path -%}
  {%- endif -%}
  { method: '{{ m.httpMethod }}', handler: '{{ m.id }}', path: '{{ path|toExpressPath }}',},

{% endfor -%}
{% endif -%}
{% if r.resources %}
{% for rname, r in resources %}
  {%- include "./resource-partial.js" with r -%}
{%- endfor -%}
{%- endif -%}
