/* @generated - do not edit directly */
/* @flow */

export type PathMapping = {
  method: string,
  handler: string,
  path: string,
};

const mapping: Array<PathMapping> = [
{% if resources %}
{% for rname, r in resources %}
  {%- include "./resource-partial.js" with r -%}
{%- endfor -%}{%- endif -%}
];

export default mapping;
