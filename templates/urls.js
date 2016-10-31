/* @generated - do not edit directly */
/* @flow */

export type PathMapping = {
  method: string,
  handler: string,
  path: string,
};

const mapping: Array<PathMapping> = [
{% for rname, r in resources %}{% for mname, m in r.methods %}
  { method: '{{ m.httpMethod }}', handler: '{{ m.id }}', path: '{{ (servicePath + m.path)|buildurl|toExpressPath }}'},
{%- endfor -%}{%- endfor -%}
];

export default mapping;
