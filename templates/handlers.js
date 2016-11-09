/* @generated - do not edit directly */
/* @flow */
{% spaceless %}
{% set Name = name|capitalize %}
{% set Version = version|replace('\.', '_')|capitalize %}
{% set Namespace = [Name, Version]|join('') %}
{%- endspaceless -%}

import type {
  $Request,
  $Response,
} from 'express';
import type {
  ProxyResponse,
  Body,
} from 'express-http-proxy';

export type ShimHandler = (
  googleResponse: ProxyResponse, // Response from Google.
  googleData: Body, // Response data from Google.
  requestToPocketship: $Request, // Original request to pocketship from client.
  responseFromPocketship: $Response, // Response Pocketship is sending back to client.
  handlerId: string,
) => Promise<?Error>;

const handlers: { [key: string]: ShimHandler } = {};

{% if resources %}
{% for rname, r in resources -%}
{% for mname, m in r.methods -%}
// import {{ m.id|idToCamelCase }} from './handlers/{{ m.id|idToPath }}';
// handlers['{{ m.id }}'] = {{ m.id|idToCamelCase }};

{% endfor -%}
{% endfor -%}
{% endif %}

export default handlers;
