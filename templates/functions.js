/* @generated - do not edit directly */
/* @flow */
{% spaceless %}
{% set Name = name|capitalize %}
{% set Version = version|replace('\.', '_')|capitalize %}
{% set Namespace = [Name, Version]|join('') %}
{%- endspaceless -%}

{% if resources %}
import type {
{% for rname, r in resources -%}
{% for mname, m in r.methods -%}
  {{ m.id|idToCamelCase }}Params,
  {{ m.id|idToCamelCase }}PathParams,
{% endfor -%}
{% endfor -%}
} from './{{ Name}}Types';
{% endif %}

const paramValidators = {};

{% if resources %}
{% for rname, r in resources %}
{% for mname, m in r.methods -%}
paramValidators['{{ m.id }}'] = (
  pathParams: {{ m.id|idToCamelCase }}PathParams,
  body: {{ m.id|idToCamelCase }}Params,
): {{ m.id|idToCamelCase }}Params => {
  const combined: {{ m.id|idToCamelCase }}Params = {
    ...body,
    ...pathParams,
  };
  {%- for pname, p in m.parameters -%}
  {%- if p.required -%}
  if (combined.{{ pname|getSafeParamName }} === undefined || combined.{{ pname|getSafeParamName }} === null) {
    throw new Error('{{ pname|getSafeParamName }} is required but is not specified.');
  }
  {%- endif -%}
  {%- endfor -%}
  return combined;
}

{%- endfor -%}
{%- endfor -%}

export default paramValidators;

{%- endif -%}
