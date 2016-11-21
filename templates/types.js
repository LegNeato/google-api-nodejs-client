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
    {% set longDesc = p.description|convertNewline('\n   * ')|cleanComments|safe|htmlEntityDecode %}
  {% elif p.description %}
    {% set shortDesc = p.description|trim|htmlEntityDecode %}
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
  {{ pname }}: {{ nullable }}{{ Name }}{{ p.$ref }},{% if shortDesc %} // {{ shortDesc|htmlEntityDecode }} {% endif %}
  {%- elif p.items and p.items.type -%}
  {{ pname }}: Array<{{ nullable }}{{ p.items.type|mapType }}>,{% if shortDesc %} // {{ shortDesc|htmlEntityDecode }} {% endif %}
  {%- elif p.items and p.items.$ref -%}
  {{ pname }}: Array<{{ nullable }}{{ Name }}{{ p.items.$ref }}>,{% if shortDesc %} // {{ shortDesc|htmlEntityDecode }} {% endif %}
  {%- elif fixedValue -%}
  {{ pname }}: {{ nullable }}'{{ fixedValue }}',{% if shortDesc %} // {{ shortDesc|htmlEntityDecode }} {% endif %}
  {%- else -%}
  {{ pname }}: {{ nullable }}{{ p.type|mapType }},{% if shortDesc %} // {{ shortDesc|htmlEntityDecode }} {% endif %}
  {%- endif -%}
  {%- endfor -%}
  {%- endif -%}
};
{%- endfor -%}

{% if resources %}

{% for rname, r in resources %}
  {%- include "./paramtypes-partial.js" with r -%}
{%- endfor -%}
{%- endif -%}
