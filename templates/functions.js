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

{% if resources %}
{% for rname, r in resources %}
{% for mname, m in r.methods -%}
export const extract{{ m.id|idToCamelCase }}FromRequest = (
  pathParams: {{ m.id|idToCamelCase }}PathParams,
  body: {{ m.id|idToCamelCase }}Params,
): {{ m.id|idToCamelCase }}Params => {
  const combined: {{ m.id|idToCamelCase }}Params = {
    ...body,
    ...pathParams,
  };
  {%- for pname, p in m.parameters -%}
  {%- if p.required -%}
  if (combined['{{ pname }}'] === undefined || combined['{{ pname }}'] === null) {
    throw new Error('{{ pname }} is required but is not specified.');
  }
  {%- endif -%}
  {%- endfor -%}
  return combined;
}

{%- endfor -%}
{%- endfor -%}

export type MappingResult = {
  function: string,
  params: {[key: string]: string},
}

export const mapPath = (path: string | String, method: string | String): ?MappingResult => {
  let matches = null;
  {% for rname, r in resources %}
  {% for mname, m in r.methods -%}
  if (method === '{{ m.httpMethod }}') {
    matches = path.match({{ (servicePath + m.path)|buildurl|regexify }});
    if (matches) {
      return {
        function: '{{ m.id }}',
        params: {
          {%- set pathParams = m.parameterOrder -%}
          {%- for i, param in pathParams -%}
          {%- set ii = i+1 -%}
          {{ param }}: matches[{{ ii }}],
          {%- endfor -%}
        },
      };
    }
  }
  {% endfor %}
  {% endfor %}
  return null;
};

{%- endif -%}
