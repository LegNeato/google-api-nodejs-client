{% if r.methods %}
{% for mname, m in methods -%}
// import {{ m.id|idToCamelCase }} from './handlers/{{ m.id|idToPath }}';
// handlers['{{ m.id }}'] = {{ m.id|idToCamelCase }};
{%- endfor -%}
{%- endif -%}
{% if r.resources %}
{% for rname, r in resources %}
  {%- include "./handler-partial.js" with r -%}
{%- endfor -%}
{%- endif -%}
