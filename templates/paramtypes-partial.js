{% if r.methods %}
{% for mname, m in methods %}
/**
 * {{ m.id }} types.
 */
export type {{ m.id|idToCamelCase }}PathParams = {
{%- set pathParams = m.parameterOrder -%}
{%- for i, param in pathParams -%}
  {%- set ii = i+1 -%}
  {{ param }}: string,
{%- endfor -%}
};
export type {{ m.id|idToCamelCase }}Params = {
{% for pname, p in m.parameters -%}
  {{ pname }}{% if ! p.required %}?{% endif %}: {{ p.type|mapType }}, {% if p.description %}// {{ p.description|oneLine|cleanComments|safe|htmlEntityDecode }}{% endif %}
{%- endfor -%}
};
{% endfor -%}
{% endif -%}

{% if r.resources %}
{% for rname, r in resources %}
  {%- include "./paramtypes-partial.js" with r -%}
{%- endfor -%}
{%- endif -%}
