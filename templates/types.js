/* @generated - do not edit directly */
/* @flow */
{% spaceless %}
{% set Name = name|capitalize %}
{% set Version = version|replace('\.', '_')|capitalize %}
{% set Namespace = [Name, Version]|join('') %}
{%- endspaceless -%}

{% for schemaName, schema in schemas %}

export type {{ Name }}{{ schema.id }} = {
  {% if schema.properties -%}
  {%- for pname, p in schema.properties -%}
  {% spaceless %}
  {% if p.description and p.description.includes('May be absent') %}
    {% set nullable = '?' %}
  {% else %}
    {% set nullable = '' %}
  {%- endif -%}
  {% if p.description and p.description.includes('Value: the fixed string') %}
    {% set fixedValue = p.description|extractFixedValue %}
  {% else %}
    {% set fixedValue = undefined %}
  {%- endif -%}
  {% if p.description and p.description|hasNewline %}
    {% set shortDesc = undefined %}
    {% set longDesc = p.description|convertNewline('\n   * ')|cleanComments|safe %}
  {% elif p.description %}
    {% set shortDesc = p.description|trim %}
    {% set longDesc = undefined %}
  {% else %}
    {% set shortDesc = undefined %}
    {% set longDesc = undefined %}
  {%- endif -%}
  {%- endspaceless -%}
  {% if longDesc %}/**
   * {{ longDesc }}
   */
  {%- endif -%}
  {%- if p.$ref -%}
  {{ pname }}: {{ nullable }}{{ Name }}{{ p.$ref }},{% if shortDesc %} // {{ shortDesc }} {% endif %}
  {%- elif p.items and p.items.type -%}
  {{ pname }}: Array<{{ nullable }}{{ p.items.type|mapType }}>,{% if shortDesc %} // {{ shortDesc }} {% endif %}
  {%- elif p.items and p.items.$ref -%}
  {{ pname }}: Array<{{ nullable }}{{ Name }}{{ p.items.$ref }}>,{% if shortDesc %} // {{ shortDesc }} {% endif %}
  {%- elif fixedValue -%}
  {{ pname }}: {{ nullable }}'{{ fixedValue }}',{% if shortDesc %} // {{ shortDesc }} {% endif %}
  {%- else -%}
  {{ pname }}: {{ nullable }}{{ p.type|mapType }},{% if shortDesc %} // {{ shortDesc }} {% endif %}
  {%- endif -%}
  {%- endfor -%}
  {%- endif -%}
};
{%- endfor -%}

{% if resources %}

{% for rname, r in resources %}
{% for mname, m in r.methods -%}
export type {{ m.id|idToCamelCase }}PathParams = {
{%- set pathParams = m.parameterOrder -%}
{%- for i, param in pathParams -%}
  {%- set ii = i+1 -%}
  {{ param }}: string,
{%- endfor -%}
};

{% endfor %}
{% endfor %}

{% for rname, r in resources %}
{% for mname, m in r.methods -%}
export type {{ m.id|idToCamelCase }}Params = {
{% for pname, p in m.parameters -%}
  {{ pname }}{% if ! p.required %}?{% endif %}: {{ p.type|mapType }}, {% if p.description %}// {{ p.description|oneLine|cleanComments|safe }}{% endif %}
{%- endfor -%}
};
